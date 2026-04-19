import { userService } from "./user.service.js";

export const Profile = async (req,res,next) => {
   try {
    const user = await userService.Profile(req)

    res.status(200).json({user}) 
   } catch(e){
      next(e)
   }
}