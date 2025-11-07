import mongoose from "mongoose";
import { statusEnum } from "../enums/productEnum.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        minLength: 3,
        maxLength: 60,
        unique: true,
        lowercase: true,
        trim: true 
    },
    price: {
        type: Number,
        required: [true, "Price field is required"],
        min: [0, "Price numer must be a number"],
    },
    description: {
        type: String,
        required: false,
        maxLength: 200
    },
    highlighted: {
        type: Boolean,
        default: false,
        required: false,
    },
    status: {
        type: String,
        validate: {
            validator: (status) => statusEnum.includes(status),
            message: props => `${props.value} it's not a valid status`
        }
    },
    category: { 
    type: mongoose.Schema.Types.ObjectId, //guardo el id de una categoria existente en mi coleccion categories
    ref: "Category", //le digo a mongoose que ese id pertenece al modelo category
    required: true 
  }
})

export default mongoose.model("Product", productSchema)