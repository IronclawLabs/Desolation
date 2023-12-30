
import { fetchTxSignature } from "@services/fetchTxSignature.service";
import { PaymentType, ResponseMessage } from "@sharedtypes/enums";
import { postResponse, postValidateTokenPaymentBody, postWithdrawTokenBody } from "@sharedtypes/myTypes";
import { Response, Request } from "express";
import isPaymentValid from "@utils/isPaymentValid.util";
import paymentsModel from "@models/payments.model";
import getGivenTokenBalance from "@utils/getGivenTokenBalance.util";
import sendSol from "@utils/sendSol";
import sendToken from "@utils/sendToken";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";



export const postWithdrawToken = async (req: ExtendedRequest, res: Response) => {
    try {
      
        const {target_wallet,amount} = req.body as postWithdrawTokenBody
        const dbUser = req.dbUser;
        console.log(dbUser.token_balance);
        console.log(amount);
        
        if(dbUser.token_balance<amount) throw new Error("Not enough tokens")
        
        const currentUserAta =await getAssociatedTokenAddress(new PublicKey(process.env.TOKEN_MINT),new PublicKey(dbUser.wallet_address))
        const tx_sig = await sendToken(currentUserAta,dbUser.token_balance)    
        console.log("withdraw token");
    
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
