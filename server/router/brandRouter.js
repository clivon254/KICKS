

import express from "express"
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controller/productController.js"
import { verifyToken } from "../utils/verify.js"


const brandRouter = express.Router()


brandRouter.post('/create-brand',verifyToken, createBrand)

brandRouter.get('/get-brand/:brandId', getBrand)

brandRouter.get('/get-brands', getBrands)

brandRouter.put('/update-brand' ,verifyToken, updateBrand)

brandRouter.delete('/delete-brand' ,verifyToken, deleteBrand)


export default brandRouter