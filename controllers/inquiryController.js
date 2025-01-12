import inquiry from "../models/inquiry.js";
import { isItCustomer } from "./userController.js";

export async function addInquiry(req, res){
    try{
        if(isItCustomer(req)){
            const data = req.body
            data.email = req.User.email
            data.phone = req.User.phone

            let id = 0;
            const inquiries = await inquiry.
            find().sort({id:-1}).limit(1) 
            //this sort is use for get the top up last id of inquiry

            if (inquiries.length == 0){ 
                //දිග 0 කියන්නෙ database එකේ කවෘත් නෑ කියන එක
                //එසේනම් id එක = 1යි ලෙස ගන්න
                id = 1;
            }else{
                id = inquiries[0].id + 1;
            }
            //එසේ නැත්තම් inquiries එන්නෙ array ආකාරයටනෙ 
            //ඒකෙ පලවෙනි කෙනාගෙ id එකට එකක් එකතු කරලා id එක හදන්න
             
            data.id = id; 
            const newInquiry = new inquiry(data);
            const response = await newInquiry.save();

            res.json({
                message:"inquiry added successfully",
                id:response.id
            })
        }

    }catch(e){
        res.status(500).json({
            message: "failed to add inquiry",
        })
    }
}