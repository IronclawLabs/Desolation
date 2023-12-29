import links from "../data/links";
import { putCreateUserBody } from "@sharedtypes/myTypes";
import {apiTransport} from "@services/apiTransport.ts"

export async function putCreateUser(wallet_id:string){
  "use server"
  try {
    
    const body = {wallet_id} as putCreateUserBody

    return (await apiTransport(links.put_create_user, "PUT", body))
  } catch (error) {
    return {};
  }
}

