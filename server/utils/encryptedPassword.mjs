import bcryptjs from "bcryptjs"



export default async (arg) => {
   const saltCreation = await bcryptjs.genSalt(12)
   const encPassword = await bcryptjs.hash(arg, saltCreation)

   return encPassword;
}