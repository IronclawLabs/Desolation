"use server"
import { cookies } from "next/headers";
import links from "../data/links";
import { DbUser } from "../../../types/myTypes";

export async function getDbUser (){
  "use server"
  try {
    
    const nextCookies = cookies();
    const discordCookie = nextCookies.get("discord.oauth2");
    if(!discordCookie) throw Error
    
    const res = await fetch(links.get_db_user, {
      credentials: "include",
      cache: "no-store",
      headers: {
        Cookie: `${discordCookie.name}=${discordCookie.value}`,
      },
    });

    const data: DbUser = await res.json();

    return data;
  } catch (error) {
    return {} as DbUser;
  }
};

export default getDbUser;
