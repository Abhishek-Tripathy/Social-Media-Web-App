import { userCol } from "../../models/userModel.mjs";
import encryptedPassword from "../../utils/encryptedPassword.mjs";
import { generateDate } from "../../utils/generateDate.mjs";
import { generateTime } from "../../utils/generateTime.mjs";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()
const privateKey = process.env.JWT_TOKEN

export default async (req, res) => {

  try {
    const { firstName, lastName, gender, email, mobileNo, password, username } =
      req.body;

    if (!firstName || !lastName || !gender || !email || !password || !username)
      return res
        .status(200)
        .json({ status: false, message: "All fields must be filled" });

    if (!new RegExp("^[a-zA-Z][a-zA-Z.\\s]+[a-zA-Z]+$").test(firstName.trim()))
      return res
        .status(200)
        .json({ status: false, message: "Invalid First Name" });
    else if (
      !new RegExp("^[a-zA-Z][a-zA-Z.\\s]+[a-zA-Z]+$").test(lastName.trim())
    )
      return res
        .status(200)
        .json({ status: false, message: "Invalid Last Name" });
    else if (
      !new RegExp(
        "^[\\w]+([.-]?[\\w]+)@[\\w]+([.-]?[\\w]+)(.[\\w]{2,3})+$"
      ).test(email.trim())
    )
      return res
        .status(200)
        .json({ status: false, message: "Invalid Email Id" });
    else if (
      mobileNo !== "" &&
      !new RegExp("^[+0-9][0-9]{4,11}$").test(phno.trim())
    )
      return res
        .status(200)
        .json({ status: false, message: "Invalid Phone number Id" });

    const isDuplicateValue = await userCol.findOne({
      $or: [
        { "userDetails.email": email },
        { "userDetails.username": username },
        { "userDetails.mobileNo": mobileNo },
      ],
    });

    if (isDuplicateValue) {
      return res
        .status(200)
        .json({
          status: false,
          message: "User already exists with same credential",
        });
    }

    const userCollection = new userCol({
      userDetails: {
        firstName,
        lastName,
        gender,
        email,
        mobileNo: mobileNo ?? "NA",
        password: await encryptedPassword(password),
        username,
      },
      creationDateAndTime: {
        time: generateTime(),
        date: generateDate(),
      }
    });

    const saveInDB = await userCollection.save()
    
    const createToken = jwt.sign({userId: saveInDB._id}, privateKey)

    res.cookie("socialMediaApp", createToken, {
      httpOnly: true,
      maxAge: Date.now() + (30 * 24 * 60 * 60 * 1000)
    })

    res.status(201).json({status: saveInDB ? true : false, message: saveInDB})


  } catch (error) {
    console.error(`The error at controller/signin ==> ${error}`);
    res.status(500).send();
  }
};
