
import { fetchTxSignature } from "@services/fetchTxSignature.service";
import { PaymentType, ResponseMessage } from "@sharedtypes/enums";
import { TokenPaymentRecepitRes, postResponse, postValidateTokenPaymentBody, postWithdrawTokenBody } from "@sharedtypes/myTypes";
import { Response, Request } from "express";
import isPaymentValid from "@utils/isPaymentValid.util";
import paymentsModel from "@models/payments.model";
import getGivenTokenBalance from "@utils/getGivenTokenBalance.util";
import sendSol from "@utils/sendSol";



export const getTokenPaymentRecepit = async (req: ExtendedRequest, res: Response) => {
    try {
       
        //send vault wallet token address
        
        const resBody = {vault_wallet:process.env.TOKEN_VAULT_ATA} as TokenPaymentRecepitRes
        res.status(200).send(resBody)

    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message } as postResponse)
    }
}
