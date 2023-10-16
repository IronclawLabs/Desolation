import { Response,NextFunction } from "express";
import { AccountType, ResponseMessage } from "@sharedtypes/enums";


const isModerator = async (req:ExtendedRequest,res:Response,next:NextFunction) =>{
    try {
        if(req.dbUser.account_type < AccountType.moderator) throw new Error(ResponseMessage.notAdmin)
        next()
        
    }catch (error) {
        
        res.status(401)
        res.json({permission:false,message:error.message})
    }
     
  }

export default isModerator