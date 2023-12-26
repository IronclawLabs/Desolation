
import { fetchTxSignature } from "@services/fetchTxSignature.service";
import { PaymentType, ResponseMessage } from "@sharedtypes/enums";
import { postResponse, postValidateTokenPaymentBody, postWithdrawTokenBody } from "@sharedtypes/myTypes";
import { Response, Request } from "express";
import isPaymentValid from "@utils/isPaymentValid.util";
import paymentsModel from "@models/payments.model";
import getGivenTokenBalance from "@utils/getGivenTokenBalance.util";
import sendSol from "@utils/sendSol";



export const postWithdrawToken = async (req: ExtendedRequest, res: Response) => {
    try {
      
        const {target_wallet,amount} = req.body as postWithdrawTokenBody
        const dbUser = req.dbUser;
        if(dbUser.token_balance<amount) throw new Error("Not enough tokens")
        
        const tx_sig = await sendSol(target_wallet,dbUser.token_balance)        
        dbUser.token_balance  -= Number(amount);
        
        paymentsModel.create({payment_signature:tx_sig,from_wallet:"vault",payment_type:PaymentType.withdraw})
        
        await dbUser.save()
        const resBody = {message:ResponseMessage.paymentValidated,permission:true} as postResponse
        res.status(200).send(resBody)

    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message } as postResponse)
    }
}
