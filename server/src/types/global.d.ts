import { Request } from "express";
import { DbUser } from "../../../types/myTypes";
import { ObjectId } from "mongoose";
declare global{
    
    interface ExtendedRequest extends Request {
        dbUser?: DbUser;
    }


}

