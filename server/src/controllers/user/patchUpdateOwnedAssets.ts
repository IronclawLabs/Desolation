import usersModel from "@models/users.model";
import { ResponseMessage } from "@sharedtypes/enums";
import { DbNft, DbUser } from "@sharedtypes/myTypes";
import {Request,Response} from "express"
import mintAddresses from "@utils/nftAddresses.json";
import nftsModel from "@models/nfts.model";
import { getOwnedItems, getOwnedNfts } from "@utils/apiUtils.util";
import { ObjectId } from "mongoose";
export const patchUpdateOwnedAssets = async (req: ExtendedRequest, res: Response) => {
    try {
        const dbUser = req.dbUser as DbUser;        
        const ownedNfts = await getOwnedNfts(dbUser.wallet_address);
        const ownedItems = await getOwnedItems(dbUser.wallet_address);
        const newOwnedNfts = [] as ObjectId[];
        const newOwnedItems = [] as ObjectId[];

        //loop
        //update database nfts change their owner if needed
        //check if attached_items has any non-owned items update accordint to that update list
        //insert newOwnedNfts
        //loop end

        //loop
        //update database items change their owner if needed
        //check if owner nft if in ownedNfts
        //insert ownedItems
        //loop end

        //recreate user owned nft list and assign it to user
        //recreate user owned item list and assign it to user

        //verify ownership of nfts and items function by two sided check

        //save user
        //save nft
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message });
    }
}
