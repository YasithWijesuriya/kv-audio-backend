import product from '../models/product.js';

export function addProduct(req,res){
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
    newProduct.save().then(()=>{
        res.status(200).json({message: 'Product added successfully'});
    }).catch((error)=>{
        res.status(404).json({message: 'Error adding product'});
    })
}