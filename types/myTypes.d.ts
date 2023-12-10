import { type } from "os";
import {  AccountType, AllowedChains,ResponseMessage, Socials } from "./enums";
import { Document, Types } from 'mongoose';

// DB MODELS
export interface DbUser extends Document {
  token_balance: number;
  account_type: AccountType;
  is_active: boolean;
}  



  export interface DiscordUser {
    discord_id: string;
    username: string;
    avatar: string;
    mfa_enabled:boolean;
    access_token:string
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
 