

import express from "express"
import { generateAccessToken, verifyToken } from "../utils/verify.js"
import { adminOrders, callback, COD, confirmPayment, deleteOrder, mpesa, updateStatus, userOrders } from "../controller/orderController.js"



const orderRouter = express.Router()



orderRouter.post("/mpesa" ,verifyToken ,generateAccessToken, mpesa)


orderRouter.post('/callback' , callback)


orderRouter.post('/confirm-payment/:CheckoutRequestID/:orderId' , verifyToken, generateAccessToken, confirmPayment)


orderRouter.post('/COD',verifyToken ,COD)


orderRouter.get('/get-userOrders' ,verifyToken , userOrders)


orderRouter.get('/get-adminOrders' , verifyToken, adminOrders)


orderRouter.put('/update-status' , verifyToken, updateStatus)


orderRouter.delete('/delete-order/:orderId' , verifyToken, deleteOrder)






export default orderRouter