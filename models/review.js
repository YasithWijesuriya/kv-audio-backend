import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required : true,
        default:Date.now()
    },
    profilePicture :{
        type:String,
        required:true,
        default:"default.jpg"
    },
    isApproved :{
        type:Boolean,
        required :true,
        default:false
    }
})

const reviews = mongoose.model("userReview",reviewSchema)
export default  reviews;