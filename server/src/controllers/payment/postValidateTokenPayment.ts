
import { fetchTxSignature } from "@services/fetchTxSignature.service";
import { PaymentType, ResponseMessage } from "@sharedtypes/enums";
import { postResponse, postValidateTokenPaymentBody } from "@sharedtypes/myTypes";
import { Response, Request } from "express";
import isPaymentValid from "@utils/isPaymentValid.util";
import paymentsModel from "@models/payments.model";
import getGivenTokenBalance from "@utils/getGivenTokenBalance.util";



export const postValidateTokenPayment = async (req: ExtendedRequest, res: Response) => {
    try {
      
        const {tx_signature,tx_sender} = req.body as postValidateTokenPaymentBody
        const dbUser = req.dbUser;
        
        const txData = await fetchTxSignature(tx_signature);
        if(!txData) throw new Error("Invalid signature");
        if(tx_sender !== dbUser.wallet_address) throw new Error("Invalid sender");
        if(!isPaymentValid(txData,tx_sender)) throw new Error("Invalid payment");
        const givenTokenBalance =  await getGivenTokenBalance(txData);
        
        paymentsModel.create({from_wallet:tx_sender,payment_signature:tx_signature,payment_type:PaymentType.deposit,amount:givenTokenBalance})
        
        dbUser.token_balance  += Number(givenTokenBalance);
        
        await dbUser.save()
        const resBody = {message:ResponseMessage.paymentValidated,permission:true} as postResponse
        res.status(200).send(resBody)

    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message } as postResponse)
    }
}
