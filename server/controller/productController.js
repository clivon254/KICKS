

import Brand from "../model/brandModel.js"
import Category from "../model/categoryModel.js"
import Color from "../model/colorModel.js"
import Order from "../model/orderModel.js"
import Product from "../model/productModel.js"
import Size from "../model/sizeModel.js"
import { errorHandler } from "../utils/error.js"




// STATS

export const stats = async (req,res,next) => {

    
    try
    {
        const {query} = req.query

        const numofDays = Number(query) || 28

        const currentDate = new Date()

        const startDate = new Date()

        startDate.setDate(currentDate.getDate() - numofDays)

        const totalProducts = await Product.find({}).countDocuments()

        const outOfStock = await Product.find({instock: {$lt:1}})

        const pendingOrders = await Order.find({status: "pending"}).countDocuments()

        const saleStatus = await Order.aggregate([
            {
                $match:{
                    status:"pending"
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d" , date:"$createdAt"}
                    },
                    Total:{$sum:1}
                }
            },
            {$sort: {_id: 1}}
        ])

        const categorys = await Category.find({}).countDocuments()

        const brands = await Brand.find({}).countDocuments()

        res.status(200).json({
            success:true,
            totalProducts,
            outOfStock,
            brands,
            categorys,
            pendingOrders,
            saleStatus
        })

        
    }
    catch(error)
    {
        next(error)
    }

}



// PRODUCTS

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

        res.status(200).json({success:true , message:`${newProduct.name} created successfully`})
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
        const products = await Product.find({
            ...(req.query.category && { category : req.query.category}),
            ...(req.query.brand && { brand : req.query.brand}),
            ...(req.query.offer && { offer : req.query.offer}),
            ...(req.query.feature && { feature : req.query.feature}),
            ...(req.query.latest && { latest : req.query.latest})
        })
        .sort({_id:-1})

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
                    feature:req.body.feature,
                    colors:req.body.colors,
                    sizes:req.body.sizes,
                    instock:req.body.instock
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


// BRAND

export const createBrand = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to create a brand"))
    }

    const {name} = req.body

    try
    {
        const newBrand = new Brand({
            name
        })

        await newBrand.save()

        res.status(200).json({success:true , message:`${newBrand.name} brand added successffully`})

    }
    catch(error)
    {
        next(error)
    }

}


export const getBrand = async (req,res,next) => {

    const {brandId} = req.params

    try
    {
        const brand = await Brand.findById(brandId)

        if(!brand)
        {
            return next(errorHandler(404,"brand not found"))
        }

        res.status(200).json({success:true , brand})

    }
    catch(error)
    {
        next(error)
    }

}


export const getBrands = async (req,res,next) => {

    try
    {
        const brands = await Brand.find({}).sort({_id:-1})

        res.status(200).json({success:true , brands})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateBrand = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to update this brand"))
    }

    const {brandId}  = req.params

    const brand = await Brand.findById(brandId)

    if(!brand)
    {
        return next(errorHandler(404,"brand not found"))
    }

    try
    {

        const updatedBrand = await Brand.findByIdAndUpdate(
            brandId,
            { 
                $set:{
                    name:req.body.name
                }
            }
            ,
            {new:true}
        )

        res.status(200).json({success:true ,  updatedBrand})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteBrand = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to update this brand"))
    }

    const {brandId}  = req.params

    const brand = await Brand.findById(brandId)

    if(!brand)
    {
        return next(errorHandler(404,"brand not found"))
    }

    try
    {
        await Brand.findByIdAndDelete(brandId)

        res.status(200).json({success:true , message:`${brand.name} is deleted`})

    }
    catch(error)
    {
        next(error)
    }

}



// CATOGORIES

export const createCategory = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to create a category"))
    }

    const {name} = req.body

    try
    {
        const newCategory = new Category({
            name
        })

        await newCategory.save()

        res.status(200).json({success:true , message:`${newCategory.name} category added successffully`})

    }
    catch(error)
    {
        next(error)
    }

}

export const getCategory = async (req,res,next) => {

    const {categoryId} = req.params

    try
    {
        const category = await Category.findById(categoryId)

        if(!category)
        {
            return next(errorHandler(404,"category not found"))
        }

        res.status(200).json({success:true , category})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCategorys = async (req,res,next) => {

    try
    {

        const categorys = await Category.find({}).sort({_id:-1})

        res.status(200).json({success:true , categorys})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateCategory = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to update this category"))
    }

    const {categoryId}  = req.params

    const category = await Category.findById(categoryId)

    if(!category)
    {
        return next(errorHandler(404,"Category not found"))
    }

    try
    {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { 
                $set:{
                    name:req.body.name
                }
            },
            {new:true}
        )

        res.status(200).json({success:true ,  updatedCategory})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteCategory = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to delete this Category"))
    }

    const {categoryId}  = req.params

    const category = await Category.findById(categoryId)

    if(!category)
    {
        return next(errorHandler(404,"category not found"))
    }

    try
    {
        await Category.findByIdAndDelete(categoryId)

        res.status(200).json({success:true , message:`${category.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}



// SIZE

export const createSize = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to create a Size"))
    }

    const {name} = req.body

    try
    {
        const newSize = new Size({
            name
        })

        await newSize.save()

        res.status(200).json({success:true , message:`${newSize.name} Size added successffully`})

    }
    catch(error)
    {
        next(error)
    }

}

export const getSize = async (req,res,next) => {

    const {sizeId} = req.params

    try
    {
        const size = await Size.findById(sizeId)

        if(!size)
        {
            return next(errorHandler(404,"size not found"))
        }

        res.status(200).json({success:true , size})

    }
    catch(error)
    {
        next(error)
    }

}


export const getSizes = async (req,res,next) => {

    try
    {

        const sizes = await Size.find({}).sort({_id:-1})

        res.status(200).json({success:true , sizes})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateSize = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to update this Size"))
    }

    const {sizeId}  = req.params

    const size = await Size.findById(sizeId)

    if(!size)
    {
        return next(errorHandler(404,"size not found"))
    }

    try
    {
        
        const updatedSize = await Size.findByIdAndUpdate(
            sizeId,
            { 
                $set:{
                    name:req.body.name,
                }
            },
            {new:true}
        )

        res.status(200).json({success:true ,  updatedSize})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteSize = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to delete this Size"))
    }

    const {sizeId}  = req.params

    const size = await Size.findById(sizeId)

    if(!size)
    {
        return next(errorHandler(404,"size not found"))
    }

    try
    {
        await Size.findByIdAndDelete(sizeId)

        res.status(200).json({success:true , message:`${size.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}




// Color

export const createColor = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to create a color"))
    }

    const {name,hex} = req.body

    try
    {
        const newColor = new Color({
            name,hex
        })

        await newColor.save()

        res.status(200).json({success:true , message:`${newColor.name} Color added successffully`})

    }
    catch(error)
    {
        next(error)
    }

}

export const getColor = async (req,res,next) => {

    const {colorId} = req.params

    try
    {
        const color = await Color.findById(colorId)

        if(!color)
        {
            return next(errorHandler(404,"color not found"))
        }

        res.status(200).json({success:true , color})

    }
    catch(error)
    {
        next(error)
    }

}


export const getColors = async (req,res,next) => {

    try
    {

        const colors = await Color.find({}).sort({_id:-1})

        res.status(200).json({success:true , colors})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateColor = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to update this Color"))
    }

    const {colorId}  = req.params

    const color = await Color.findById(colorId)

    if(!color)
    {
        return next(errorHandler(404,"color not found"))
    }

    try
    {
        const updatedColor = await Color.findByIdAndUpdate(
            colorId,
            { 
                $set:{
                    name:req.body.name,
                    hex:req.body.hex
                }
            },
            {new:true}
        )

        res.status(200).json({success:true ,  updatedColor})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteColor = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to delete this color"))
    }

    const {colorId}  = req.params

    const color = await Color.findById(colorId)

    if(!color)
    {
        return next(errorHandler(404,"color not found"))
    }

    try
    {
        await Color.findByIdAndDelete(colorId)

        res.status(200).json({success:true , message:`${color.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}

