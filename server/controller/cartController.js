
import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const addToCart = async (req,res,next) => {

    const {itemId ,size ,color} = req.body

    const userId = req.user.id

    try
    {
        const product = await Product.findById(itemId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        const userData = await User.findById(userId)

        if(!userData)
        {
            return next(errorHandler(404,"user not found"))
        }
        
        let cartData = await userData.cartData 

        if(size && color)
        {
            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(!cartData[itemId][size])
            {
                cartData[itemId][size] = {}
            }

            if(!cartData[itemId][size][color])
            {
                cartData[itemId][size][color] = 0
            }

            cartData[itemId][size][color] += 1

        }
        else if(size)
        {
            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(cartData[itemId][size])
            {
                cartData[itemId][size] += 1
            }
            else
            {
                cartData[itemId][size] = 1
            }

        }
        else if(color)
        {
            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(cartData[itemId][color])
            {
                cartData[itemId][color] += 1
            }
            else
            {
                cartData[itemId][color] = 1
            }
        }
        else
        {
            if(cartData[itemId])
            {
                cartData[itemId] += 1
            }
            else
            {
                cartData[itemId] = 1
            }

        }

        await User.findByIdAndUpdate(userId ,{cartData})

        res.status(200).json({success:true ,message:`${product.name} is added`})
    }
    catch(error)
    {
        next(error)
    }
}

export const removeCart = async (req,res,next) => {

    const { itemId, size, color } = req.body;

    const userId = req.user.id;

    try
    {
        const product = await Product.findById(itemId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        const userData = await User.findById(userId);

        if (!userData) 
        {
            return next(errorHandler(404, "user not found"));
        }

        let cartData = userData.cartData || {};

        if(!cartData[itemId])
        {
           return next(errorHandler(400, `${product.name} not found in cart`)) 
        }

        // Handle removal based on size and color
        if (size && color) {

            if (cartData[itemId][size] && cartData[itemId][size][color])
            {

                cartData[itemId][size][color] -= 1; // Decrease the quantity

                // If quantity reaches zero, remove the entry
                if (cartData[itemId][size][color] <= 0) 
                {
                    delete cartData[itemId][size][color];
                }

                // If no more colors for this size, remove the size entry
                if (Object.keys(cartData[itemId][size]).length === 0) {
                    delete cartData[itemId][size];
                }

            } 
            else 
            {
                return next(errorHandler(400, "Specified size and color not found in cart" ))
            }

        }
        else if(size)
        {

            if (cartData[itemId][size]) 
            {
                cartData[itemId][size] -= 1; // Decrease the quantity

                // If quantity reaches zero, remove the entry
                if (cartData[itemId][size] <= 0)
                {
                    delete cartData[itemId][size];
                }

            } 
            else 
            {
                return next(errorHandler(400, "Specified size not found in cart" ))
            }

        }
        else if(color)
        {

            if (cartData[itemId][color])
            {
                cartData[itemId][color] -= 1; // Decrease the quantity

                // If quantity reaches zero, remove the entry
                if (cartData[itemId][color] <= 0) 
                {
                    delete cartData[itemId][color];
                }

            } 
            else 
            {
                return next(errorHandler(400, "Specified color not found in cart" ))
            }

        } 
        else 
        {
            // If the item does not require size
            cartData[itemId] -= 1;

            if (cartData[itemId] <= 0) {

                delete cartData[itemId];

            }
        }

        await User.findByIdAndUpdate(userId ,{cartData})

        res.status(200).json({ success: true, message: `${product.name} removed from cart`});

    }
    catch(error)
    {
        next(error)
    }
}

export const getCart = async (req,res,next) => {

    const userId = req.user.id

    try
    {
        const userData = await User.findById(userId)

        if(!userData)
        {
            return next(errorHandler(404 ,"user not found"))
        }

        let cartData = userData.cartData || {}

        let totalProducts = 0 

        let totalPrice = 0 

        for(const itemId in cartData)
        {
            const product = await Product.findById(itemId)

            if(product)
            {
                const sizesOrColors = cartData[itemId]

                for(const sizeOrColor in sizesOrColors)
                {

                    if(typeof sizesOrColors[sizeOrColor] === 'object')
                    {

                        for(const color in sizesOrColors[sizeOrColor])
                        {
                            const quantity = sizesOrColors[sizeOrColor][color]

                            totalProducts += quantity

                            totalPrice += quantity * product.offer ? product.discountPrice : product.regularPrice 
                        }

                    }
                    else
                    {
                        const quantity  = sizesOrColors[sizeOrColor]

                        totalProducts += quantity

                        totalPrice += quantity * product.offer ? product.discountPrice : product.regularPrice
                    }

                }

            }

        }


        res.status(200).json({success:true , cartData , totalProducts , totalPrice})

    }
    catch(error)
    {
        next(error)
    }
}