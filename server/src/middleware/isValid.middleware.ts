import usersModel from "@models/users.model";
import { ResponseMessage } from "@sharedtypes/enums";
import { DbUser } from "@sharedtypes/myTypes";
import { Response,NextFunction } from "express";

const admins = ["415570551004725248","922494670871855104"]

const isValid = async (req:ExtendedRequest,res:Response,next:NextFunction) =>{
    try {
        let user = req.user as DbUser
        if(!user) throw new Error(ResponseMessage.noCookieUser);

        let dbUser = await usersModel.findOne({discord_id:user.discord_id}) as DbUser
        if(!dbUser) throw new Error (ResponseMessage.userNotExist)
        if(!admins.includes(dbUser.discord_id)) throw new Error
        req.dbUser = dbUser
        next()
        
    }catch (error) {
        
        res.status(401)
        res.json({permission:false,message:error.message})
    }
     
  }

export default isValid