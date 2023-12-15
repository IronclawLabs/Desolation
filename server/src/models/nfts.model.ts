import { AccountType } from "@sharedtypes/enums"
import mongoose from "mongoose"

const Nfts = new mongoose.Schema({
    nft_type: {
        type: Number,
        required: true,
    },
    nft_owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null,
        required: true,
    },
    skill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills',
        default: null,
    },
    mint_address: {
        type: String,
        required: true,
        unique: true,
    },
    attached_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
        default: null,
    }],
    boost_id: {
        type: Number,
        default: null,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
})

export default mongoose.model("Nfts", Nfts)