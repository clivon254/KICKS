

import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


export const signup = async (req,res,next) => {

    const {password,email,username} = req.body

    if(!password || !email || !password || password === "" || email === "" || username === "")
    {
        return next(errorHandler(400 ,"Please fill up all the fiedls"))
    }

    try
    {
        const user  =  await User.findOne({email})

        if(user)
        {
            return next(errorHandler(401,"email already signed up"))
        }

        const hashedPassword = bcryptjs.hashSync(password ,10)

        const newUser = new User({
            email,
            password:hashedPassword,
            username
        })

        await newUser.save()

        res.status(200).json({success:true , message:"Account created successfully"})
    }
    catch(error)
    {
        next(error)
    }

}

export const signin = async (req,res,next) => {

    const {email,password} = req.body

    if(!email || !password || email === "" || password === "")
    {
        return next(errorHandler("please fill up  allhe fields"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404, "The email has not signed up"))
        }

        const isMatch = bcryptjs.compareSync(password , user.password)

        if(!isMatch)
        {
            return next(errorHandler(400,"invalid password"))
        }

        const token = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin },
            process.env.JWT_SECRETE,
            {expiresIn :"12h"}
        )

        const {password:pass , ...rest} = user._doc

        res.status(200).json({success:true , rest , token})

    }
    catch(error)
    {
        next(error)
    }

}

export const google = async (req,res,next) => {

    try
    {
        const user = await User.findOne({email:req.body.email})

        if(user)
        {

            const token = jwt.sign(
                {id:user._id, isAdmin:user.isAdmin },
                process.env.JWT_SECRETE,
                {expiresIn :"12h"}
            )

            const {password:pass , ...rest} = user._doc

            res.status(200).json({success:true , rest , token})

        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                                     Math.random().toString(36).slice(-8) 

            const hashedPassword = bcryptjs.hashSync(generatedPassword ,10)
            
            const newUser = new User({
                username:req.body.name.split(' ').join(' ').toLowerCase() + Math.random().toString(36).slice(8),
                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo
            })

            await newUser.save()

            const token = jwt.sign(
                {id:user._id, isAdmin:user.isAdmin },
                process.env.JWT_SECRETE,
                {expiresIn :"12h"}
            )

            const {password:pass , ...rest} = newUser._doc

            res.status(200).json({success:true , rest , token})


        }
    }
    catch(error)
    {
        next(error)
    }

}

export const forgotPassword = async (req,res,next) => {

    const {email} = req.body

    if(!email)
    {
        return next(errorHandler(400,"please provide an email"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404 ,"The email has not been signed up"))
        }

        const token = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin },
            process.env.JWT_SECRETE,
            {expiresIn :"12h"}
        )

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const url = process.env.FRONTEND_URL

        const mailOptions = {
            from:'KICKS 254',
            to:user.email,
            subject:"RESET PASSORD",
            text:`Click the link and to reset your password:${url}/${token}`
        }

        transporter.sendMail(mailOptions ,(error,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }
        })

        res.status(200).json({success:true ,message:'message sent'})


    }
    catch(error)
    {
        console.log(error)
    }

}

export const resetPassword = async (req,res,next) => {

    const {token} = req.params

    const {password , confirmPassword} = req.body

    try
    {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(404, "user not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler(400 ,"passwords do not match"))
        }

        const hashedPassword = bcryptjs.hashSync(password ,10)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({success:true , message:"password reset successfull"})
    }
    catch(error)
    {
       next(error)
    }

}