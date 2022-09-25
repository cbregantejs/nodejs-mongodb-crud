import { Schema, model } from "mongoose";

const productSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    }
});

export default model("Product", productSchema);