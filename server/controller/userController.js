
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"



export const getUser = async (req,res,next) => {

    const {userId} = req.params

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404 ,"user not found"))
        }

        const {password , ...rest} = user._doc

        res.status(200).json({success:true , rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const getUsers = async (req,res,next) => {

    try
    {
        const users = await User.find({}).sort({_id:-1})

        res.status(200).json({success:true , users})

    }
    catch(error)
    {
        next(error)
    }
    
}


export const updateUser = async (req,res,next) => {

    if(!req.user.id && !req.user.isAdmin)
    {
        return next(errorHandler(403,"Your not allowed to update the user"))
    }

    const {userId} = req.params

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404, "user not found"))
        }

        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password , 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                }
            },
            {new:true}
        )

        const {password , ...rest} = updatedUser._doc

        res.status(200).json({success:true , rest})

    }
    catch(error)
    {
        next(error)
    }
    
}


export const deleteUser = async (req,res,next) => {

    if(!req.user.id && !req.user.isAdmin)
    {
        return next(errorHandler(403,"Your not allowed to delete the user"))
    }

    const {userId} = req.params

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404, "user not found"))
        }

        await User.findByIdAndDelete(userId)

        res.status(200).json({success:true , message:"user deleted successfully"})
    }
    catch(error)
    {
        next(error)
    }
    
}