

import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts, stats, updateProduct } from "../controller/productController.js"
import { verifyToken } from "../utils/verify.js"


const productRouter = express.Router()



productRouter.post("/create-product" , verifyToken, createProduct)
 

productRouter.post("/stats" ,verifyToken, stats)


productRouter.get("/get-product/:productId" , getProduct)


productRouter.get("/get-products" , getProducts)


productRouter.put("/update-product/:productId" ,verifyToken, updateProduct)


productRouter.delete("/delete-product/:productId" ,verifyToken, deleteProduct)



export default productRouter
