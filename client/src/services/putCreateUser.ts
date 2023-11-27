"use server"
import { cookies } from "next/headers";
import links from "../data/links";
import { putCreateUserBody } from "@sharedtypes/myTypes";

export async function putCreateUser(wallet_id:string){
  "use server"
  try {
    
    const body = {wallet_id} as putCreateUserBody
    
    const res = await fetch(links.put_create_user, {
      credentials: "include",
      cache: "no-store",
      method:"PUT",
      headers: {
        'Content-Type': 'application/json', // set the content type of the request body
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {};
  }
};

