
import { Response, Request } from "express";



export const getAdmin = async (req: ExtendedRequest, res: Response) => {
    try {
      
        const admin = req.dbUser
        res.status(200).send(admin)

    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
