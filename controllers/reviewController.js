import reviews from "../models/review.js";

export function addReview(req,res){
    if(req.User == null){
        res.status(401).send({
            message :"please login and try again",
        })
    return;
    }

    const data =req.body;
    data.name = req.User.firstName + " " + req.User.lastName;
    data.email = req.User.email;
    data.profilePicture = req.User.profilePicture;

    const newReview = new reviews(data);
    newReview.save().then(()=>{
        res.status(201).send({
            message :"review added successfully",
        })
    }).catch(()=>{
        res.status(500).send({
            message :"failed to add review",
        })
    })

}