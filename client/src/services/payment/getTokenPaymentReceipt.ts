"use server"
import links from "../../data/links";
import {TokenPaymentRecepitRes } from "@sharedtypes/myTypes";

export async function getTokenPaymentRecepit (){
  try {

    const res = await fetch(links.post_withdraw_token, {
      credentials: "include",
        cache: "no-store",
        method:"GET",
      
        headers: {
        },
    });

    const data = await res.json() as TokenPaymentRecepitRes;

    return data;
  } catch (error) {
    return {} as TokenPaymentRecepitRes;
  }
}

