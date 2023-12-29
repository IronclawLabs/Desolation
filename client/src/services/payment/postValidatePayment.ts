import links from "../../data/links"
import {DbUser, postValidateTokenPaymentBody} from "@sharedtypes/myTypes"
import {apiTransport} from "@services/apiTransport.ts"

export async function postValidateTokenPayment(tx_signature: string, tx_sender: string) {
  try {
    return (await apiTransport(links.post_validate_payment, "POST", {
      tx_sender,
      tx_signature
    } as postValidateTokenPaymentBody))
  } catch (error) {
    return {}
  }
}

