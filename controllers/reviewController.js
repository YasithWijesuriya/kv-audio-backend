import reviews from "../models/review.js";

export function addReviews(req, res) {
    if (req.User == null) {
        res.status(401).json({
            message: "please login and try again",
        })

        return;
    }

    const data = req.body;
    data.name = req.User.firstName + " " + req.User.lastName;
    data.email = req.User.email;
    data.profilePicture = req.User.profilePicture;

    const newReview = new reviews(data);
    newReview.save().then(() => {
        res.status(201).json({
            message: "review added successfully",
        })
    }).catch(() => {
        res.status(500).json({
            message: "failed to add review",
        })
    })
}

// create get review function

/*
export async function getReviews(req, res) {
    const user = req.User;
  
    try {
      if (user == null || user.role !== "admin") {
        const reviews = await reviews.find({ isApproved: true });
        res.status(200).json(reviews);
      } else if (user.role === "admin") {
        const reviews = await reviews.find();
        res.status(200).json(reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }
    */

export function getReviews(req, res) {
    const user = req.User;
    if (user == null || user.role !== "admin") {
        reviews.find({ isApproved: true }).then((reviews) => {
            res.status(200).json(reviews);
        })
        return;
    }

    if (user.role == "admin") {

        reviews.find().then((reviews) => {
            res.status(200).json(reviews);
        })
    }
}

//this is use for delete reviews

export function deleteReview(req, res) {
    const Email = req.params.email;

    if (req.User == null) {
        res.status(401).json({
            message: "please login and try again",
        });
        return;
    }

    if (req.User.role == "admin") {
        reviews.deleteOne({ email: Email }).then(() => {
            res.status(200).json({
                message: "review deleted successfully",
            });
        }).catch(() => {
            res.status(500).json({
                message: "failed to delete review",
            })
        })
        return;
    }

    if(req.User.role == "customer"){
        if(req.User.email == Email){
            reviews.deleteOne
            ({ email: Email }).then(() => {
                res.status(200).json({
                    message: "review deleted successfully",
                })
            }).catch(()=>{
                res.status(500).json({
                    message: "failed to delete review",
                })
            });

        }else{
            res.status(403).json({
                message: "you are not allowed to delete this review",
            })
        }
    }


}

// reviews approve function

export function aprproveReview(req,res){
    const Email = req.params.email;
    if(req.User == null){
        res.status(401).json({
            message: "please login and try again",
        })
    return;
    }
    if (req.User.role == "admin") {
        reviews.updateOne(
            {
                email: Email,
            },
            {
                isApproved :true,
            }
        ).then(()=>{
            res.status(200).json({
                message: "review approved successfully",
            })
        }).catch(()=>{
            res.status(500).json({
                message: "failed to approve review",
            })
        });
    }else{
        res.status(403).json({
            message: "you are not and admin.Only admins can approve reviews",
        })
    }
}