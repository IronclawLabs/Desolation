"use server"
import { cookies } from "next/headers";
import links from "../../data/links";
import { DbUser, postValidateTokenPaymentBody } from "@sharedtypes/myTypes";

export async function postValidateTokenPayment (tx_signature:string,tx_sender:string){
  try {
    const nextCookies = cookies();
    const userJwt = nextCookies.get("user_jwt");
    if(!userJwt) throw Error

    const res = await fetch(links.post_validate_payment, {
      credentials: "include",
        cache: "no-store",
        method:"POST",
        body:JSON.stringify({tx_sender,tx_signature} as postValidateTokenPaymentBody),
        headers: {
          Authorization:`Bearer ${userJwt.value}`
        },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {};
  }
};

