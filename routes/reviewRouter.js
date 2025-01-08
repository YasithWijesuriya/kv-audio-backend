import express from "express";
import { addReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/",addReviews)

export default reviewRouter;