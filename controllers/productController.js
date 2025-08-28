
import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

 // add product function


export async function addProduct(req,res){

    if(req.user == null){
      res.status(401).json({
        message : "Please login and try again"
      })
      return
    }
    if(req.user.role !="admin"){
      res.status(403).json({
        message : "You are not authorized to perform this action"
      })
      return
    }


    try{
      const { key, name, price, category, dimensions, description, availability, image } = req.body;

      if(!name || !price || !dimensions || !description){
        res.status(400).json({
          message: "Missing required fields: name, price, dimensions, description"
        })
        return
      }

      const generatedKey = key && key.trim().length > 0
        ? key
        : `${String(name).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}-${Date.now()}`;

      const payload = {
        key: generatedKey,
        name,
        price,
        category,
        dimensions,
        description,
        availability: availability !== undefined ? availability : true,
        image: Array.isArray(image) ? image : (image ? [image] : undefined)
      };

      const newProduct = new Product(payload);
      await newProduct.save();
      res.status(201).json({
        message : "Product registered successfully",
        product: newProduct
      })
    }catch(error){
      res.status(500).json({
        error : "Product registration failed"
      })
    }
}

// get product function
export async function getProducts(req,res){

  try{
    const isAdmin = isItAdmin(req);

    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '12', 10), 1);
    const search = (req.query.q || '').toString().trim();
    const category = (req.query.category || '').toString().trim();
    const available = req.query.availability;
    const sortParam = (req.query.sort || '').toString().trim();

    const filter = {};
    if(!isAdmin){
      filter.availability = true;
    }
    if(category){
      filter.category = category;
    }
    if(available === 'true' || available === 'false'){
      filter.availability = available === 'true';
    }
    if(search){
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let sort = { createdAt: -1 };
    if(sortParam){
      if(sortParam === 'price_asc') sort = { price: 1 };
      else if(sortParam === 'price_desc') sort = { price: -1 };
      else if(sortParam === 'name_asc') sort = { name: 1 };
      else if(sortParam === 'name_desc') sort = { name: -1 };
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    return;
  }catch(e){
    res.status(500).json({
      message : "Failed to get products"
    })
  }
}


// update product function
export async function updateProduct(req,res){
  try{
    if(isItAdmin(req)){

      const key = req.params.key;

      const data = req.body

      await Product.updateOne({key:key},data)

      res.json({
        message : "Product updated successfully"
      })
      return;

    }else{
      res.status(403).json({
        message : "You are not authorized to perform this action"
      })
      return;
    }

  }catch(e){
    res.status(500).json({
      message : "Failed to update product"
    })
  }
}

 //delete product function

export async function deleteProduct(req,res){
  try{
    if(isItAdmin(req)){
      const key = req.params.key;
      await Product.deleteOne({key:key})
      res.json({
        message : "Product deleted successfully"
      })
    }else{
      res.status(403).json({
        message : "You are not authorized to perform this action"
      })
      return;
    }
  }catch(e){
    res.status(500).json({
      message : "Failed to delete product"
    })
  }
}

export async function getProduct(req,res){
  try{
    const key = req.params.key;
    const product = await Product.findOne({key:key})
    if(product == null){
      res.status(404).json({
        message : "Product not found"
      })
      return;
    }
    res.json(product)
    return;
  }catch(e){
    res.status(500).json({
      message : "Failed to get product"
    })
  }
}


