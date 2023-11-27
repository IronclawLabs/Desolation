import usersModel from "@models/users.model";
import { ResponseMessage } from "@sharedtypes/enums";
import { DbUser } from "@sharedtypes/myTypes";
import {Request,Response} from "express"
export const getUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const dbUser = req.dbUser as DbUser;        
        res.status(200).send(dbUser);
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
