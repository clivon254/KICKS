import express from "express"
import { verifyToken } from "../utils/verify.js"
import { createSize, deleteSize, getSize, getSizes, updateSize } from "../controller/productController.js"


const sizeRouter = express.Router()


sizeRouter.post('/create-size', verifyToken, createSize)

sizeRouter.get('/get-size/:sizeId', getSize)

sizeRouter.get('/get-sizes', getSizes)

sizeRouter.put('/update-size/:sizeId' ,verifyToken, updateSize)

sizeRouter.delete('/delete-size/:sizeId' ,verifyToken, deleteSize)



export default sizeRouter