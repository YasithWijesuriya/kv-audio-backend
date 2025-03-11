import express from 'express';
import { approveOrRejectOrder, createOrder, getQuote } from '../controllers/orderController.js';
import { getOrders } from '../controllers/userController.js';

const orderRouter = express.Router();

orderRouter.post("/",createOrder)
orderRouter.post("/quote",getQuote)
orderRouter.get("/",getOrders)
orderRouter.put("/status/:orderId",approveOrRejectOrder)

export default orderRouter;