import { type } from "os";
import {  AccountType, AllowedChains,ResponseMessage, Socials } from "./enums";
import { Document, Types } from 'mongoose';

// DB MODELS
export interface DbUser extends Document {
  token_balance: number;
  owned_nfts: Types.ObjectId[] | null;
  owned_items: Types.ObjectId[] | null;
  account_type: number;
  wallet_address: string;
  total_withdrawn: number;
  total_spent: number;
  balance_table_id: Types.ObjectId | null;
  is_active: boolean;
}  



  export interface DiscordUser {
    discord_id: string;
    username: string;
    avatar: string;
    mfa_enabled:boolean;
    access_token:string
  } 

  export interface DbMission extends Document {
    token_balance: number;
    type_id: number;
    owner_id: Types.ObjectId | null;
    participants: Map<string, string[]>;
    ends_at: Date;
    started_at: Date;
    starter_nft_id: Types.ObjectId;
    location_id: number;
    is_active: boolean;
  } 

  export interface DbNft extends Document {
    nft_type: number;
    nft_owner_id: Types.ObjectId;
    skill_id?: Types.ObjectId | null;
    mint_address: string;
    attached_items: Types.ObjectId[] | null;
    boost_id?: number | null;
    is_active: boolean;
  }
  export interface DbItem extends Document {
    token_balance: number;
  type_id: number;
  unique_ability_id: number;
  owner_id: Types.ObjectId;
  mint_address: string;
  holder_nft_id: Types.ObjectId | null;
  skill_id: number;
  is_active: boolean;


  }

export interface postValidateTokenPaymentBody{
  tx_signature:string,
  tx_sender:string
}


export interface putCreateUserBody{
  wallet_id:ResponseMessage
}


export interface postResponse{
  message:ResponseMessage
  permission:boolean
}
 