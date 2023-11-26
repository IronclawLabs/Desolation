import usersModel from "@models/users.model";
import { ResponseMessage } from "@sharedtypes/enums";
import { postCreateUserBody } from "@sharedtypes/myTypes";
import {Request,Response} from "express"
export const postCreateUser = async (req: Request, res: Response) => {
    try {
        const {wallet_id} = req.body as postCreateUserBody;




        await usersModel.create({wallet_id})//add auto balance_talbe_id creation in to the model file
        
        res.status(200).send({message:ResponseMessage.successful});
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
