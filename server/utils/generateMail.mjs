import NodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = NodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL_ACCOUNT,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendMail = (mailId, username, message) => {
  const mailOptions = {
    from: {
      name: username,
      address: mailId,
    },
    to: "sahoosivasankar33@gmail.com",
    subject: "Message From NoteMate User",
    html: `
        <h1>EmailId : ${mailId}</h1>
        <h1>Name : ${username}</h1>
        <h1>Message : </h1><p>${message}</p>
        `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(`Server Error : mail couldn't be sent--> ${error}`);
    } else {
      sendReply(mailId, username, message);
    }
  });
};
