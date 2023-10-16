"use server";

import { cookies } from "next/headers";
import links from "../data/links";
import { DbUser, DiscordUser } from "../../../types/myTypes";
import { revalidatePath } from "next/cache";
export async function logout() {
  "use server";

  try {
    const nextCookies = cookies();
    const discordCookie = nextCookies.get("discord.oauth2");

    const res = await fetch(links.logout, {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
      headers: {
        Cookie: `${discordCookie?.name}=${discordCookie?.value}`,
      },
    });

    revalidatePath(links.get_db_user);
  } catch (error) {}
}
