import { AccountType } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Missions = new mongoose.Schema({
    token_balance: {
        type: Number,
        required: true,
        default: 0
    },
    type_id: {
        type: Number,
        required: true,
        enum: AccountType,
        default: AccountType.user
    },
    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null,
    },
       
    ends_at: {
        type: Date,
        required:true
      },
    started_at: {
        type: Date,
        default: Date.now
      },
    nft_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    location_id:{
        type:Number,
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true

    },
})
export default mongoose.model("Missions", Missions)