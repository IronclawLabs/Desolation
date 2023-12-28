import Cookies from "js-cookie";
import links from "../data/links";
import { DbUser } from "@sharedtypes/myTypes";

export async function getDbUser (){
  try {
    const userJwt = Cookies.get("user_jwt");

    if(!userJwt)return;
    
    const res = await fetch(links.get_db_user, {
      credentials: "include",
      cache: "no-store",
      headers:{
        Authorization:`Bearer ${userJwt}`
      }
    });

    const data = await res.json() as DbUser;

    return data;
  } catch (error) {
    return {} as DbUser;
  }
}

