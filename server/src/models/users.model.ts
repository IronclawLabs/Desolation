import { AccountType } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Users = new mongoose.Schema({
    token_balance: {
        type: Number,
        required: true,
        default: 0
    },
    owned_nfts: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nfts',
        default: null,

    }],
    owned_items: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
        default: null,

    }],

    account_type: {
        type: Number,
        required: true,
        enum: AccountType,
        default: AccountType.user
    },
    wallet_address:{
        type: String,
        required: true,
        unique:true,
    },
    total_withdrawn: {
        type: Number,
        required: true,
        default: 0
    },
    total_spent: {
        type: Number,
        required: true,
        default: 0
    
    },
    balance_table_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Balances',
        default: null,
    
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true

    },
})
export default mongoose.model("Users", Users)