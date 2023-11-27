"use server"
import { cookies } from "next/headers";
import links from "../data/links";
import { DbUser } from "@sharedtypes/myTypes";

export async function getDbUser (){
  try {
    const nextCookies = cookies();
    const userJwt = nextCookies.get("user_jwt");
    if(!userJwt) throw Error

    const res = await fetch(links.get_db_user, {
      credentials: "include",
        cache: "no-store",
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

