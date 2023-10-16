import { type } from "os";
import {  AccountType, AllowedChains,ResponseMessage, Socials } from "./enums";
import { Document, Types } from 'mongoose';

// DB MODELS
export interface DbUser extends Document {
  discord_id: string;
  owned_creatures:Types.ObjectId[];
  account_type: AccountType;
  su_amount:number;
  rewards:Types.ObjectId;
  bio:string
  socials:{[key in Socials]:string}
  discord_user:DiscordUser
  is_profile_visible:boolean;
  current_cult_discord_id:string;
  collected_lp:number
  is_active: boolean;
}  



  export interface DiscordUser {
    discord_id: string;
    username: string;
    avatar: string;
    mfa_enabled:boolean;
    access_token:string
  } 

 