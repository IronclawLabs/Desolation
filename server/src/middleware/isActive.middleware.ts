import { Response,NextFunction } from "express";
import { ResponseMessage } from "@sharedtypes/enums";


const isActive = async (req:ExtendedRequest,res:Response,next:NextFunction) =>{
    try {
        if(!req.dbUser.is_active) throw new Error(ResponseMessage.notActive)
        next()
        
    }catch (error) {
        
        res.status(401)
        res.json({permission:false,message:error.message})
    }
     
  }

export default isActive