import missionsModel from "@models/missions.model"
import usersModel from "@models/users.model"
import { DbMission, DbUser } from "@sharedtypes/myTypes";
import { NftMintsByOwnerRequest, RestClient, StreamClient } from "@hellomoon/api";
import { solidityPacked } from "ethers";
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
        const currentNftOwners = await getAllNfts();
        for (let mission of activeMissions) {
            const currentMissionParticipants = mission.participants;
            
            currentMissionParticipants.forEach(async (mintAddresses, wallet) => {
               const ownedNfts = Array.from(currentNftOwners.filter((pair:any) => pair.ownerAccount === wallet).map((pair:any) => pair.mint));

               
                if(!mintAddresses.every(elementB => ownedNfts.includes(elementB))){
                    mission.is_active=false; //deactivate mission maybe something else?
                    await mission.save();
                }

               
                
                
            });
            
      
        }
       async function getAllNfts(pageOnly:any = null, limit = 1000) {
        
        let page = pageOnly ?? 1
        
        let shouldIterate = true
        const mints = []

        while (shouldIterate) {

          const {data} = await client.send(new NftMintsByOwnerRequest({
            helloMoonCollectionId: "c4d283323af70979073f5cb6145f3a4b",
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