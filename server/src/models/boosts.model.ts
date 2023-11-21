import { AccountType } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Skills = new mongoose.Schema({
    
    is_active: {
        type: Boolean,
        required: true,
        default: true

    },
})
export default mongoose.model("Skills", Skills)