import express from "express";
import { addReviews, aprproveReview, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/",addReviews)
reviewRouter.get("/", getReviews)
reviewRouter.delete("/:email",deleteReview)


export default reviewRouter;