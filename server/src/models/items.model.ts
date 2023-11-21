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
    item_owner_id:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nfts',
        required: true,
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