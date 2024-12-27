
import express from "express"
import { createColor, deleteColor, getColor, getColors, updateColor } from "../controller/productController.js"
import { verifyToken } from "../utils/verify.js"

const colorRouter = express.Router()



colorRouter.post('/create-color',verifyToken, createColor)

colorRouter.get('/get-color/:colorId', getColor)

colorRouter.get('/get-colors', getColors)

colorRouter.put('/update-color' , verifyToken, updateColor)

colorRouter.delete('/delete-color' ,verifyToken, deleteColor)



export default colorRouter