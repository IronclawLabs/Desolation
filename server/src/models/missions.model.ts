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
    participants: {
        type: Map,
        of: [{
          wallet: {
            type: String,
          },
          values: [String],
        }],
        default: new Map(),
      },
    ends_at: {
        type: Date,
        required:true
      },
    started_at: {
        type: Date,
        default: Date.now
      },
    starter_nft_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Nfts',

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