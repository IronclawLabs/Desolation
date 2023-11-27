import usersModel from "@models/users.model";
import { ResponseMessage } from "@sharedtypes/enums";
import { DbUser, putCreateUserBody } from "@sharedtypes/myTypes";
import {Request,Response} from "express"
import jwt from 'jsonwebtoken';

export const putCreateUser = async (req: Request, res: Response) => {
    try {
        const { wallet_id } = req.body as putCreateUserBody;

        let dbUser = await usersModel.findOne({ wallet_id }) as DbUser;
        console.log("naber");
        
        if (!dbUser) {
            dbUser = await usersModel.create({ wallet_id }) as DbUser;
        }

        const payload = {
            sub: dbUser._id,
            // Add the expiration time (1 hour from now)
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        };
        const token = jwt.sign(payload, process.env.CLICKER_JWT_KEY);

        res.status(200).send({ token: token, message: ResponseMessage.successful });
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message });
    }
}
