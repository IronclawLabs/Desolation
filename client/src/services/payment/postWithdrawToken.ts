import links from "../../data/links"
import {DbUser, postWithdrawTokenBody} from "@sharedtypes/myTypes"
import {apiTransport} from "@services/apiTransport.ts"

export async function postWithdrawToken(target_wallet: string, amount: number) {
  try {
    
    return (await apiTransport(links.post_withdraw_token, "POST", {target_wallet, amount} as postWithdrawTokenBody) as DbUser)
  } catch (error) {
    return {} as DbUser
  }
}

