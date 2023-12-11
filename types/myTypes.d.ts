import { type } from "os";
import {  AccountType, AllowedChains,ResponseMessage, Socials } from "./enums";
import { Document, Types } from 'mongoose';

// DB MODELS
export interface DbUser extends Document {
  token_balance: number;
  account_type: AccountType;
  is_active: boolean;
  wallet_address: string;
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
  participants: Map<String, String[]>;
  ends_at: Date;
  started_at: Date;
  nft_id: Types.ObjectId;
  location_id: number;
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
 