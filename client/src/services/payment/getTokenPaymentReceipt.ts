"use server"
import { cookies } from "next/headers";
import links from "../../data/links";
import { DbUser, TokenPaymentRecepitRes, postWithdrawTokenBody } from "@sharedtypes/myTypes";

export async function getTokenPaymentRecepit (){
  try {
    const nextCookies = cookies();
    const userJwt = nextCookies.get("user_jwt");
    if(!userJwt) throw Error

    const res = await fetch(links.post_withdraw_token, {
      credentials: "include",
        cache: "no-store",
        method:"GET",
      
        headers: {
          Authorization:`Bearer ${userJwt.value}`
        },
    });

    const data = await res.json() as TokenPaymentRecepitRes;

    return data;
  } catch (error) {
    return {} as TokenPaymentRecepitRes;
  }
};

