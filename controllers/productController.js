import product from '../models/product.js';

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

export async function getProduct(req,res){
    try{
        const products = await product.find();
        res.status(200).send(products);

    }catch(e){
       res.status(500).json({
        message: "failed to get product"
       })
    }
}