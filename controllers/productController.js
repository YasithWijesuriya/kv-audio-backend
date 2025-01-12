import product from '../models/product.js';
import { isItAdmin } from './userController.js';

// add product function
export async function addProduct(req,res){
    console.log(req.User)

    if(req.User == null){
        res.status(401).send({
            message: "please login and try again"
        })
        return
        }
    
    if(req.User.role != "admin"){
        res.status(401).send({
            message: "you are not authorized to add products"
        })
        return
    }
    const data = req.body;
    const newProduct = new product(data);
    try{
        await newProduct.save();
        res.status(201).send({
            message: "product added successfully",
        })
    }catch{
        res.status(500).send({
            message: "failed to add product"
        })
    }
}

// get product function

export async function getProduct(req,res){
    try{
        if(isItAdmin(req)){
        const products = await product.find();
        res.status(200).send(products);
        return;
    }else{
        const products = await product.find({availability: true});
        res.status(200).send(products);
        return;

    }
    }catch(e){
       res.status(500).json({
        message: "failed to get product"
       })
    }
}

// update product function

export async function updateProduct(req,res){
    try{
        if(isItAdmin(req)){
            const Key =req.params.key;

            const data = req.body

            await product.updateOne({key:Key},data)
            res.status(200).send({
                message: "product updated successfully"
            })

        }else{
            res.status(403).json({
                message: "you are not authorized to update product"
            })
        }

    }catch(e){
        res.status(500).json({
            message: "failed to update product"
        })
    }
}

export async function deleteProduct(req,res){
    
    try{
        if(isItAdmin(req)){
            const Key = req.params.key;
            await product.deleteOne({key:Key})
            res.status(200).send({
                    message: "product deleted successfully"
                }) 
        }else{
            res.status(403).json({
                message: "you are not authorized to delete product"
            })
            return;
        }

    }catch(e){
        res.status(500).json({
            message: "failed to delete product"
        })
    }
}
