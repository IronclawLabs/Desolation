import links from "../../data/links";
import { DbUser, TokenPaymentRecepitRes, postWithdrawTokenBody } from "@sharedtypes/myTypes";
import {apiTransport} from "@services/apiTransport.ts"

export async function getTokenPaymentRecepit (){
  try {

    return (await apiTransport(links.post_withdraw_token, "GET") as TokenPaymentRecepitRes)
  } catch (error) {
    return {} as TokenPaymentRecepitRes;
  }
}

