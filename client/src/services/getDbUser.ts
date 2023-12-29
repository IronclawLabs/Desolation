import links from "../data/links"
import {DbUser} from "@sharedtypes/myTypes"
import {apiTransport} from "@services/apiTransport.ts"

export async function getDbUser() {
  try {
    return (await apiTransport(links.get_db_user, "GET") as DbUser)
  } catch (error) {
    return {} as DbUser
  }
}

