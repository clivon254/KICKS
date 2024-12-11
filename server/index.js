

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import productRouter from "./router/productRouter.js"


const app = express()

const PORT = process.env.PORT



app.use(express.json())

app.use(cors())


// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))



// ROUTER
app.use("/api/auth" , authRouter)


app.use("/api/user" , userRouter)


app.use("/api/product" , productRouter)




// API
app.get("/",(req,res) => (

    res.send("READY FOR KICKS")

))


// LISTENING
app.listen(PORT , (err) => {

    if(!err)
    {
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
    }
    else
    {
        console.log(err)
    }

})


app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500

    const message = err.message || "internal server error"

    res.status(statusCode).json({success:false , message:message})
})