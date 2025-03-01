import express from 'express';
import { addProduct,deleteProduct,getProducts,getProduct,updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.post('/', addProduct);
productRouter.get('/', getProducts);
productRouter.delete('/:key', deleteProduct);
productRouter.put('/:key', updateProduct);
productRouter.get('/:key',getProduct);


export default productRouter;