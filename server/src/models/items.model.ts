import { AccountType } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Items = new mongoose.Schema({
token_balance: {
        type: Number,
        required: true,
        default: 0
    },
    type_id: {
        type: Number,
        required: true,
    },
    unique_ability_id: {
        type:Number,
        required: true,
    },
    owner_id:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    mint_address: {
        type: String,
        required: true,
        unique: true,
    },
    holder_nft_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nfts',
        default: null,
    
    },

    skill_id:{
        type: Number,
        required: true,
    
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true

    },
})
export default mongoose.model("Items", Items)