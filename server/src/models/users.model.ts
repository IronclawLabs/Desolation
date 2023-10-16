import { AccountType } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Users = new mongoose.Schema({
    discord_id: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    account_type: {
        type: Number,
        required: true,
        enum: AccountType,
        default: AccountType.user
    },
    discord_user: {
        required: true,
        type: mongoose.Schema.Types.Mixed,
        default: {},

    },
    is_active: {
        type: Boolean,
        required: true,
        default: true

    },
})
export default mongoose.model("Users", Users)