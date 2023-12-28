import links from "../../data/links";
import {  postValidateTokenPaymentBody } from "@sharedtypes/myTypes";

export async function postValidateTokenPayment (tx_signature:string,tx_sender:string){
  try {


    

    const res = await fetch(links.post_validate_payment, {
      credentials: "include",
        cache: "no-store",
        method:"POST",
        body:JSON.stringify({tx_sender,tx_signature} as postValidateTokenPaymentBody),
        headers: {

        },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {};
  }
}

