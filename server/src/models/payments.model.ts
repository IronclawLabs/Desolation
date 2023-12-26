import { AccountType, PaymentType } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Payments = new mongoose.Schema({
    payment_signature: {
        type: String,
        required: true,
        index:true,
        unique:true,
    },
    from_wallet: {
        type: String,
        required: true,
    },
    payment_type: {
        type: Number,
        required: true,
        enum: PaymentType,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true

    },
})
export default mongoose.model("Payments", Payments)