import { AccountType } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Balances = new mongoose.Schema({
    token_balance: {
        type: Number,
        required: true,
        default: 0
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        unique:true,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true

    },
})
export default mongoose.model("Balances", Balances)