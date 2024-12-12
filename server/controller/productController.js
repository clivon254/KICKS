

import Product from "../model/productModel.js"
import { errorHandler } from "../utils/error.js"



export const createProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to create product"))
    }

    const {
        name,description,images,instock,regularPrice,discountPrice,category,brand,colors,sizes
    } = req.body

    try
    {
        const newProduct = new Product({
            name,description,images,instock,regularPrice,discountPrice,category,brand,colors,sizes
        })

        await newProduct.save()

        res.status(200).json({success:true , mesage:`${newProduct.name} created successfully`})
    }
    catch(error)
    {
        next(error)
    }
}

export const getProduct = async (req,res,next) => {

    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404 ,"product not found"))
        }

        res.status(200).json({success:true , product})
    }
    catch(error)
    {
        next(error)
    }
}

export const getProducts = async (req,res,next) => {

    try
    {
        const products = await Product.find().sort({_id:-1})

        res.status(200).json({success:true , products})
    }
    catch(error)
    {
        next(error)
    }
}

export const updateProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,'You are not allowed to update the product'))
    }

    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404 ,"Product not found"))
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set:{
                    name:req.body.name,
                    description:req.body.description,
                    images:req.body.images,
                    brand:req.body.brand,
                    category:req.body.category,
                    regularPrice:req.body.regularPrice,
                    discountPrice:req.body.discountPrice,
                    offer:req.body.offer,
                    latest:req.body.latest,
                    featured:req.body.featured,
                    colors:req.body.colors,
                    sizes:req.body.sizes
                }
            },
            {new:true}
        )

        res.status(200).json({success:true ,updatedProduct})

    }
    catch(error)
    {
        next(error)
    }
}

export const deleteProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,'You are not allowed to delete the product'))
    }

    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404 ,"Product not found"))
        }

        await Product.findByIdAndDelete(productId)

        res.status(200).json({success:true , message:`${product.name} deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }
}


export const stats = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}