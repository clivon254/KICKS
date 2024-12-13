

import express from "express"
import { forgotPassword, google, resetPassword, signin, signup } from "../controller/authController.js"

const authRouter = express.Router()



authRouter.post('/sign-up', signup)


authRouter.post('/sign-in', signin)


authRouter.post('/google', google)


authRouter.post('/forgot-password', forgotPassword)


authRouter.post('/reset-password/:token', resetPassword)



export default authRouter