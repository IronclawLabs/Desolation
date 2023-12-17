import { NftHoldingPeriodV1Request, NftMintInformationRequest, NftMintsByOwnerRequest, OwnershipForPubkeyRequest, RestClient } from "@hellomoon/api";

const client = new RestClient("b6239bbc-222e-490d-a4b1-faf2b3066e08");//TODO: move to .env

export async function getOwnedNfts(owner:string) {
    return await client.send(new OwnershipForPubkeyRequest({
      helloMoonCollectionId: process.env.NFT_COLLECTION_ID,
      owner: owner
    }))
  }

  export async function getOwnedItems(owner:string) {
    return await client.send(new OwnershipForPubkeyRequest({
      helloMoonCollectionId: process.env.ITEM_COLLECTION_ID,
      owner: owner
    }))
  }

  export async function getNftsMetadata(mints:string[]) {
    let page = 1
    let shouldIterate = true
    const metadatas = []
  
    while (shouldIterate) {
      const {data} = await client.send(new NftMintInformationRequest({
        nftMint: mints,
        limit: 1000,
        page: page
      }))
      if (data.length === 0) shouldIterate = false
      page++
      metadatas.push(...data)
    }
  
    return metadatas
  }
  export async function getNftMetadata(mint:string) {
    let page = 1
  
      const {data} = await client.send(new NftMintsByOwnerRequest({
        nftMint: mint,
        limit: 1000,
        page: page
      }))
      page++
    
    return data[0]
  }
