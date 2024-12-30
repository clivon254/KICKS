

import express from "express"
import { verifyToken } from "../utils/verify.js"
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controller/productController.js"



const categoryRouter = express.Router()


categoryRouter.post('/create-category', verifyToken, createCategory)


categoryRouter.get('/get-category/:categoryId', getCategory)


categoryRouter.get('/get-categorys', getCategorys)


categoryRouter.put('/update-category/:categoryId' ,verifyToken, updateCategory)


categoryRouter.delete('/delete-category/:categoryId' ,verifyToken, deleteCategory)



export default categoryRouter