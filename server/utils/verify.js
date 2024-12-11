
import jwt from "jsonwebtokon"
import { errorHandler } from "./error.js"


export const verifyToken = (req,res,next) => {

    const {token} = req.headers

    if(!token)
    {
        return next(errorHandler(404,"There is no token"))
    }

    jwt.verify(token ,process.env.JWT_SECRETE ,(err,user) => {

        if(err)
        {
            return next(errorHandler(403 ,"Unauthorized"))
        }

        req.user = user
        
        next()

    })
}