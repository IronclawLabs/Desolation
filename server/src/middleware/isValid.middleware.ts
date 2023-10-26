import usersModel from "@models/users.model";
import { ResponseMessage } from "@sharedtypes/enums";
import { DbUser } from "@sharedtypes/myTypes";
import { Response,NextFunction } from "express";

const admins = ["415570551004725248","922494670871855104"]

const isValid = async (req:ExtendedRequest,res:Response,next:NextFunction) =>{
    try {
        next()
        
    }catch (error) {
        
        res.status(401)
        res.json({permission:false,message:error.message})
    }
     
  }

export default isValid