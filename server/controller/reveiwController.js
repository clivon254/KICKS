
import Reveiw from "../model/reveiwModel.js"
import { errorHandler } from "../utils/error.js"


export const AddReveiw = async (req,res,next) => {
    
    if(!req.user.id)
    {
        return next(errorHandler(403,"you are not allowed to add reveiw"))
    }

    const userId = req.user.id

    const {productId , content} = req.body

    try
    {
        const newReveiw = new Reveiw({
            userId ,
            productId,
            content
        })

        await newReveiw.save()

        res.status(200).json({succcess:true , newReveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiw = async (req,res,next) => {

    const {reveiwId} = req.params

    const reveiw = await Reveiw.findById(reveiwId)

    if(!reveiw)
    {
        return next(errorHandler(404 , "Review not found"))
    }

    try
    {

        res.status(200).json({success:true , reveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiws = async (req,res,next) => {

    const {productId} = req.params

    try
    {
        const reveiws = await Reveiw.find({productId})
                                    .sort({_id:-1})
                                    .populate({path:"userId"})

        res.status(200).json({success:true , reveiws})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateReveiw = async (req,res,next) => {

    if(!req.user.id && !req.user.isAdmin)
    {
        return next(errorHandler(404 , "you are not allowed to update reveiw"))
    }

    const {reveiwId} = req.params

    const reveiw = await Reveiw.findById(reveiwId)

    if(!reveiw)
    {
        return next(errorHandler(404 , "Review not found"))
    }

    try
    {

        const updatedReveiw = await Reveiw.findByIdAndUpdate(
            reveiwId, 
            {
                $set:{
                    content:req.body.content
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedReveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteReveiw = async (req,res,next) => {

    if(!req.user.id && !req.user.isAdmin)
    {
        return next(errorHandler(404 , "you are not allowed to update reveiw"))
    }
    
    const {reveiwId} = req.params

    const reveiw = await Reveiw.findById(reveiwId)

    if(!reveiw)
    {
        return next(errorHandler(404 , "Review not found"))
    }

    try
    {
        await Reveiw.findByIdAndDelete(reveiwId)
    }
    catch(error)
    {
        next(error)
    }

}