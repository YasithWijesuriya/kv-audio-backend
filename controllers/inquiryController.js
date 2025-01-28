import inquiry from '../models/inquiry.js';
import { isItCustomer, isItAdmin } from "./userController.js";

export async function addInquiry(req, res) {
    try {
        if (isItCustomer(req)) {
            const data = req.body
            data.email = req.User.email
            data.phone = req.User.phone

            let id = 0;
            const inquiries = await inquiry.
                find().sort({ id: -1 }).limit(1)
            //this sort is use for get the top up last id of inquiry

            if (inquiries.length == 0) {
                //දිග 0 කියන්නෙ database එකේ කවෘත් නෑ කියන එක
                //එසේනම් id එක = 1යි ලෙස ගන්න
                id = 1;
            } else {
                id = inquiries[0].id + 1;
            }
            //එසේ නැත්තම් inquiries එන්නෙ array ආකාරයටනෙ 
            //ඒකෙ පලවෙනි කෙනාගෙ id එකට එකක් එකතු කරලා id එක හදන්න

            data.id = id;
            const newInquiry = new inquiry(data);
            const response = await newInquiry.save();

            res.json({
                message: "inquiry added successfully",
                id: response.id
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "failed to add inquiry",
        })
    }
}

// get inquiry

export async function getInquiries(req, res) {
    try {
        if (isItCustomer(req)) {
            const inquiries = await inquiry.find({
                email: req.User.email
            })
            res.json(inquiries);
            return;
        } else if (isItAdmin(req)) {
            const inquiries = await inquiry.find();
            res.json(inquiries);
            return;
        } else {
            res.status(401).json({
                message: "you are not authorized to perform this action",
            })
            return;
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "failed to get inquiries",
        })

    }
}
/*
export async function deleteInquiries(req,res){
    try{
        if(isItAdmin(req)){
            const Id = req.params.id;
            await inquiry.deleteOne({id:Id})
            res.json({
                message:"inquiry deleted successfully"
            })
            return;
            
        }else if(isItCustomer(req)){
            const Id = req.params.id;

            const inquiry = await inquiry.findOne({id:Id});
            if(inquiry == null){
                res.status(404).json({
                    message: "inquiry not found",
                })
                return;
            }else{
                if(inquiry.email == req.User.email){
                    await inquiry.deleteOne({id:Id})
                    res.json({
                        message:"inquiry deleted successfully"
                    })
                    return;
                }else{
                    res.status(401).json({
                        message: "you are not authorized to perform this action",
                    })
                }
            }
        }else{
            res.status(401).json({
                message: "you are not authorized to perform this action",
            })
            return;
        }

    }catch(e){
            console.log(e)
            res.status(500).json({
                message: "failed to delete inquiry",
            })
    }

}*/

export async function deleteInquiries(req, res) {
    try {
        if (isItAdmin(req)) {
            const Id = req.params.id;
            await inquiry.deleteOne({ id: Id });
            res.json({
                message: "Inquiry deleted successfully"
            });
            return;
        } else if (isItCustomer(req)) {
            const Id = req.params.id;

            const foundInquiry = await inquiry.findOne({ id: Id });
            if (!foundInquiry) {
                res.status(404).json({
                    message: "Inquiry not found"
                });
                return;
            }

            if (foundInquiry.email === req.User.email) {
                await inquiry.deleteOne({ id: Id });
                res.json({
                    message: "Inquiry deleted successfully"
                });
            } else {
                res.status(401).json({
                    message: "You are not authorized to perform this action"
                });
            }
        } else {
            res.status(401).json({
                message: "You are not authorized to perform this action"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Failed to delete inquiry"
        });
    }
}

// export async function updateInquiries(req, res) {
//     try {
//         const Id = req.params.id;
//         const data = req.body;

//         if (isItAdmin(req)) {
//             await inquiry.updateOne({ id: Id }.data)
//             res.json({
//                 message: "Inquiry updated successfully"
//             })
//         } else if (isItCustomer) {
//             const Id = req.params.id;
//             const data = req.body;

//             const inquiry = await inquiry.findOne({ id: Id });
//             if (inquiry == null) {
//                 res.status(404).json({
//                     message: "Inquiry not found"
//                 })
//                 return;

//             } else {
//                 if (inquiry.email == req.User.email) {
//                     await inquiry.updateOne({ id: Id },{message : data.message})
//                     res.json({
//                         message: "Inquiry updated successfully"
//                     })
//                     return;
//                 } else {
//                     res.status(401).json({
//                         message: "You are not authorized to perform this action"
//                     })
//                     return;
//                 }
//             }

//         }else{
//             res.status(401).json({
//                 message: "You are not authorized to perform this action"
//             })
//         }
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({
//             message: "Failed to update inquiries"
//         })
//     }
// }

//update inquiry

export async function updateInquiry(req,res){

    try{
  
      if(isItAdmin(req)){
        const Id = req.params.id;
        const data = req.body;
  
        await inquiry.updateOne({id:Id},data)
        res.json({
          message : "Inquiry updated successfully"
        })
      }else if(isItCustomer(req)){
        const Id = req.params.id;
        const data = req.body;
  
        const foundInquiry = await inquiry.findOne({ id: Id });
        if(inquiry == null){
          res.status(404).json({
            message : "Inquiry not found"
          })
          return;
        }else{
          if(foundInquiry.email == req.User.email){
  
  
  
            await inquiry.updateOne({id:Id},{message : data.message})
            res.json({
              message : "Inquiry updated successfully"
            })
            return;
          }else{
            res.status(403).json({
              message : "You are not authorized to perform this action"
            })
            return
          }
        }
      }else{
        res.status(403).json({
          message : "You are not authorized to perform this action"
        })
      }
  
    }catch(e){
        console.log(e)
      res.status(500).json({
        message : "Failed to update inquiry"
      })
    }
  }
