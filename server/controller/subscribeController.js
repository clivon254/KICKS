
import Subscribe from "../model/subScribeModel.js"
import { errorHandler } from "../utils/error.js"
import nodemailer from "nodemailer"



export const subscribe = async (req,res,next) => {

    const {email} = req.body

    try
    {
        const existingEmail = await Subscribe.findOne({email})

        if(existingEmail)
        {
            return next(errorHandler(400,"The email has already been subscribed"))
        }

        const newSubScriber = new Subscribe({
            email
        })

        await newSubScriber.save()

        res.status(200).json({success:true ,message:"subscribe was added successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const sendMessage = async (req,res,next) => {

    const {message,subject} = req.body

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to send message to the users"))
    }

    try
    {
        const subscribers = await Subscribe.find({})

        const recipientEmails = subscribers.map((subscriber) => subscriber.email).join(',')

        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        var mailOptions = {
            from:"KICKS",
            to:recipientEmails,
            subject:subject,
            text:message
        }

        transporter.sendMail(mailOptions ,(error,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent " + info.response)
            }

        })

        res.status(200).json({success:true ,message:"message sent to the emails"})

    }
    catch(error)
    {
        next(error)
    }

}