import {Request,Response} from "express"
export const getPublicDemo = async (req: Request, res: Response) => {
    try {

        
        
        res.status(200).send({message:"works!"});
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
