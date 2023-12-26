"use server"
import { cookies } from "next/headers";
import links from "../../data/links";
import { DbUser, postWithdrawTokenBody } from "@sharedtypes/myTypes";

export async function postWithdrawToken (target_wallet:string,amount:number){
  try {
    const nextCookies = cookies();
    const userJwt = nextCookies.get("user_jwt");
    if(!userJwt) throw Error

    const res = await fetch(links.post_withdraw_token, {
      credentials: "include",
        cache: "no-store",
        method:"POST",
        body:JSON.stringify(({target_wallet,amount} as postWithdrawTokenBody)),
        headers: {
          Authorization:`Bearer ${userJwt.value}`
        },
    });

    const data = await res.json() as DbUser;

    return data;
  } catch (error) {
    return {} as DbUser;
  }
};

