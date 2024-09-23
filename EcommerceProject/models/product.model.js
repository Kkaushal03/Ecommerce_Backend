const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Reference to the Category model
        required: true
    },
    availableItems: {
        type: Number,
        required: true
    }
},{timestamps:true,versionKey:false});
module.exports = mongoose.model("Product",productSchema);