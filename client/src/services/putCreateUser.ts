import links from "../data/links";
import { putCreateUserBody } from "@sharedtypes/myTypes";
import Cookies from 'js-cookie';

export async function putCreateUser(wallet_id: string) {
  try {
    const body = { wallet_id } as putCreateUserBody;

    const res = await fetch(links.put_create_user, {
      credentials: "include",
      cache: "no-store",
      method: "PUT",
      headers: {
        'Content-Type': 'application/json', // set the content type of the request body
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data);
    //Cookies.set('user_jwt', data.token,{secure:true,expires:1,sameSite:"Strict"});

    console.log(Cookies.get("fsdf"));
    // Save the token to a cookie with HttpOnly flag

    return data;
  } catch (error) {
    return {};
  }
}
