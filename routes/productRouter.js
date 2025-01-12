import express from 'express';
import { addProduct,deleteProduct,getProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.post('/', addProduct);
productRouter.get('/', getProduct);
productRouter.delete('/:key', deleteProduct);
productRouter.put('/:key', updateProduct);


export default productRouter;