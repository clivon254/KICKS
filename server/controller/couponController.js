
import Coupon from "../model/couponModel.js";
import { errorHandler } from "../utils/error.js";


function generateRandomCode ()
{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const codeLength = 8;

    let code = ''

    for(let i = 0 ; i < codeLength ; i++)
    {
        code += characters[Math.floor(Math.random() * characters.length)]
    }

    return code
}


export const createCoupon = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are allowed to created a coupon"))
    }

    const {expiryDate , maxUses , discount} = req.body

    const code = generateRandomCode()

    try
    {
        const newCoupon = new Coupon({
            expiryDate , maxUses, discount ,code
        })

        await newCoupon.save()

        res.status(200).json({success:true , newCoupon})

    }
    catch(error)
    {
        next(error)
    }

}


export const applyCoupon = async (req,res,next) => {

    const {code,totalCartAmount} = req.body

    try
    {
        const coupon = await Coupon.findOne({code})

        if(!coupon)
        {
            return next(errorHandler(404 ,"coupon not found"))
        }

        if(coupon.numUses >= coupon.maxUses)
        {
            return next(errorHandler(400,"coupon has been used maximum times"))
        }

        if(coupon.expiryDate && coupon.expiryDate < Date.now())
        {
            return next(errorHandler(400,"coupon has expixed"))
        }

        coupon.numUses += 1

        const discountAmount = (totalCartAmount * coupon.discount) / 100

        const newTotalCartAmount = totalCartAmount - discountAmount

        res.status(200).json({success:true , newTotalCartAmount})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCoupon = async (req,res,next) => {

    const {couponId} = req.params

    try
    {
        const coupon = await Coupon.findById(couponId)

        if(!coupon)
        {
            return next(errorHandler(404 ,"coupon not found"))
        }

        res.status(200).json({success:true , coupon})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCoupons = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(400,"coupon has been used maximum times")) 
    }

    try
    {

        const coupons = await Coupon.find({}).sort({_id:-1})

        res.status(200).json({success:true , coupons})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateCoupon = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(400,"you are not allowed to update the coupon"))
    }

    const {couponId} = req.params

    const coupon = await Coupon.findById(couponId)

    if(!coupon)
    {
        return next(errorHandler(400,"coupon not found"))
    }

    try
    {

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            couponId,
            {
                $set:{
                    maxUses:req.body.maxUses,
                    discount:req.body.discount,
                    expiryDate:req.body.expiryDate
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedCoupon})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteCoupon = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(400,"you are not allowed to update the coupon"))
    }

    const {couponId} = req.params

    const coupon = await Coupon.findById(couponId)

    if(!coupon)
    {
        return next(errorHandler(400,"coupon not found"))
    }

    try
    {
        await Coupon.findByIdAndDelete(couponId)

        res.status(200).json({success:true , messge:"Coupon has been deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}