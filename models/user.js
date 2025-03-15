import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique : true, // එක ඊමේල් එකකින් එක්කෙනෙක් එන්න පුලුවන් අදහස
    },
    password:{
        type:String,
        required:true
    },
    isBlocked : {
        type:Boolean,
        required:true,
        default:false
    },
    
    role : {
        type:String,
        required:true,
        default:"customer"
    },
    firstName :{
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    address :{
        type:String,
        required:true
    },
    phone :{
        type:String,
        required:true
    },
    profilePicture :{
        type:String,
        required : true,
        default : "default.jpg"

    },
    emailVerified : {
        type : Boolean,
        required : true,
        default : false
      }
    });

    const User = mongoose.model("user",userSchema);

    export default User;

    /*
    "email": "sriyan@gmail.com",
    "password": "12345",
    "role": "customer",
    "firstName": "modaya",
    "lastName": "yasith",
    "address": "123 Main St, Anytown, USA",
    "phone": "+1 555 123 4567",
    "profilePicture": "default.jpg"


      "email": "yasith@gmail.com",
    "password": "12345",
    "role": "admin",
    "firstName": "yasith",
    "lastName": "wijesuriya",
    "address": "123 Main St, Anytown, USA",
    "phone": "+1 555 123 4567",
    "profilePicture": "default.jpg"


     "email": "methmiEkanayaka@gmail.com",
    "password": "12345",
    "role": "admin",
    "firstName": "methmi",
    "lastName": "wijesuriya",
    "address": "123 Main St, Anytown, USA",
    "phone": "+1 555 123 4567",
    "profilePicture": "default.jpg"

    "email": "heshani@gmail.com",
    "password": "123456",
    "role": "customer",
    "firstName": "heshani",
    "lastName": "tharuka",
    "address": "123 Main St, Anytown, USA",
    "phone": "+1 555 123 4567",
    "profilePicture": "default.jpg"

    
    */