import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true
    },
    
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category :{
        type:String,
        required:true,
        default:"uncategorized"
    },

    dimensions :{
        type:String,
        required:true       
    },

    description: {
        type: String,
        required: true
    },

    availability :{
        type:Boolean,
        required:true,
        default:true
    },
    image:{
        type:[String],
        required:true,
        default:["default.jpg"]
    }

},{ timestamps: true })
const Product = mongoose.model("Productsdb", productSchema);
export default Product;

/*
{
  "key": "12345-abcde",
  "name": "Wireless Headphones",
  "price": 79.99,
  "category": "Electronics",
  "dimensions": "7.5 x 6.5 x 3 inches",
  "description": "High-quality wireless headphones with noise-cancellation and a comfortable design.",
  "availability": true
}
*/