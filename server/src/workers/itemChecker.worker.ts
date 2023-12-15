import missionsModel from "@models/missions.model"
import usersModel from "@models/users.model"
import { DbItem, DbMission, DbNft, DbUser } from "@sharedtypes/myTypes";
import { NftMintsByOwnerRequest, RestClient, StreamClient } from "@hellomoon/api";
import { solidityPacked } from "ethers";
import { getNftMetadata } from "@utils/apiUtils.util";
import itemsModel from "@models/items.model";
import nftsModel from "@models/nfts.model";
const client = new RestClient("b6239bbc-222e-490d-a4b1-faf2b3066e08");//TODO: move to .env

/**
 * This function is responsible for checking items in active missions.
 * It retrieves active missions from the database, fetches the current NFT owners,
 * and checks if all the participants in each mission own the required NFTs.
 * If any participant is missing a required NFT, the mission is deactivated.
 * 
 * @returns {Promise<void>} A promise that resolves once the item checking process is complete.
 */
export default async function itemChecker() {

        const activeMissions = await missionsModel.find({active: true}) as DbMission[];
        // const currentNftOwners = await getAllNfts();
        // const currentItemOwners = await getAllItems(); too expensive
      //maybe use for .. of loop instead of independent forEach iterations?
        await Promise.all(activeMissions.map(async (mission) => {
          try {
          const selectedNft = await missionsModel.findById(mission.starter_nft_id).populate("starter_nft_id") as DbNft;
          const selectedNftApi = await getNftMetadata(selectedNft.mint_address);
          const selectedUser = await missionsModel.findById(mission.owner_id).populate("owner_id") as DbUser;

          if(selectedUser.wallet_address != selectedNftApi.ownerAccount || !selectedUser.owned_nfts.includes(selectedNft._id)){
              throw new Error("Mission owner does not own the required NFT");
            };

          selectedNft.attached_items.forEach(async (item:any) => {
            const currentItem = await nftsModel.findById(item).populate("attached_items") as DbItem;
            const selectedItemApi = await getNftMetadata(item);

              if(!selectedUser.owned_items.includes(currentItem._id) || selectedUser.wallet_address != selectedItemApi.ownerAccount){
                throw new Error("Mission owner does not own the required item");
              };
              if(!selectedNft.attached_items.includes(item._id)){
                throw new Error("Mission nft does not have the required item")
              }
          });
          } catch (error) {
            mission.is_active = false;
            mission.save();
          }
          
        }));



        
async function getAllNfts(pageOnly:any = null, limit = 1000) {
        
        let page = pageOnly ?? 1
        
        let shouldIterate = true
        const mints = []

        while (shouldIterate) {

        const {data} = await client.send(new NftMintsByOwnerRequest({
            helloMoonCollectionId: "c4d283323af70979073f5cb6145f3a4b",//nft collection id
            limit: limit,
            page:   page,
          }))

          if (data.length === 0 || pageOnly) shouldIterate = false
          page++
          mints.push(...(data.map((item:any) => ({
            mint: item.nftMint,
            ownerAccount: item.ownerAccount
          }))))
        }

        return mints
      
}
async function getAllItems(pageOnly:any = null, limit = 1000) {
        
  let page = pageOnly ?? 1
  
  let shouldIterate = true
  const mints = []

  while (shouldIterate) {

    const {data} = await client.send(new NftMintsByOwnerRequest({
      helloMoonCollectionId: "c4d283323af70979073f5cb6145f3a4b",//item collection id
      limit: limit,
      page: page,
    }))

    if (data.length === 0 || pageOnly) shouldIterate = false
    page++
    mints.push(...(data.map((item:any) => ({
      mint: item.nftMint,
      ownerAccount: item.ownerAccount
    }))))
  }

  return mints

}
}