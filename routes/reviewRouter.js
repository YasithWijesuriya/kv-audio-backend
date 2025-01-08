import express from "express";
import { addReviews, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/",addReviews)
reviewRouter.get("/", getReviews)

export default reviewRouter;