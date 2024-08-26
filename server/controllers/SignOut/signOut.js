export default async (req, res) => {
   try {
      res.clearCookie("socialMediaApp")
      res.status(200).send(true)
   } catch (error) {
      console.error("Error at sign out" ,error)
      res.status(500).send()
   }
}