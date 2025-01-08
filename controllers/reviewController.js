import reviews from "../models/review.js";

export function addReviews(req, res) {
    if (req.User == null) {
        res.status(401).json({
                message: "please login and try again",
            })
        }
    return;
    }
    const data = req.body;
    data.name = req.User.firstName + " "+ req.User.lastName;
    data.email = req.User.email;
    data.profilePicture = req.Use.profilePicture;

    const newReview = new reviews(data);
    newReview.save().then(()=>{
        res.status(201).json({
            message: "review added successfully",
        })
    }).catch(()=>{
        res.status(500).json({
            message: "failed to add review",
        })
    })
    
