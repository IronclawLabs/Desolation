import usersModel from "@models/users.model";
import { ResponseMessage } from "@sharedtypes/enums";
import { DbUser, putCreateUserBody } from "@sharedtypes/myTypes";
import {Request,Response} from "express"
import jwt from 'jsonwebtoken';
import { CookieOptions } from "express";

export const putCreateUser = async (req: Request, res: Response) => {
    try {
        console.log("naber");
        const { wallet_id } = req.body as putCreateUserBody;

        let dbUser = await usersModel.findOne({ wallet_address:wallet_id }) as DbUser;
        
        
        if (!dbUser) {
            dbUser = await usersModel.create({ wallet_address:wallet_id }) as DbUser;
        }

        const payload = {
            sub: dbUser._id,
            // Add the expiration time (1 day from now)
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 ,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        const cookieOptions: CookieOptions = {
            httpOnly: false,//TODO:change to true whenever its on main
            secure: true,
            expires: new Date(Date.now() + 86400000), // 1 day from now
            path: '/',
        };

        res.cookie('user_jwt', token, cookieOptions);
        res.status(200).send({ message: ResponseMessage.successful });
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message });
    }
}
