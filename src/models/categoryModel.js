import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 2,
        maxLength: 40
    },
    description: {
        type: String,
        lowercase: true,
        trim: true,
        maxLength: 200,
        required: false
    }
}, {
    timestamps: true
})

export default mongoose.model("Category", categorySchema)

