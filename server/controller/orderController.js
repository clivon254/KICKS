
import Order from "../model/orderModel.js"
import axios from "axios"
import User from "../model/userModel.js"
import Pay from "../model/payModel.js"
import { errorHandler } from "../utils/error.js"
import Product from "../model/productModel.js"
import africastalking from "africastalking"


let clients = []



export const events = (req,res) => {

    res.setHeader('Content-Type', 'text/event-stream')

    res.setHeader('Cache-Control', 'no-cache')

    res.setHeader('Connection', 'keep-alive')

    // Add the client to the list
    clients.push(res)

     // Remove the client when the connection is closed
     req.on('close', () => {
        clients = clients.filter(client => client !== res);
    })

}

// send updates to connected clients
const sendEventToClients = (data) => {

    clients.forEach(client => {
        client.write(`data: ${JSON.stringify(data)}\n\n`)
    })

}


// mpesa
export const mpesa = async (req,res,next) => {

    const {items,address,delivery,amount,paymentmethod}  = req.body

    const userId = req.user.id

    const token = req.token

    const phone = address.phone.substring(1)


    try
    {

        // creating new order
        const order = new Order({
            items,address,paymentmethod,amount,delivery,userId
        })

        await order.save()

        const  date = new Date()

        const timestamp = 
            date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2) 
        
        const shortcode = process.env.PAYBILL


        const passkey = process.env.PASS_KEY


        const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")


        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"


        const Callback_url = process.env.CALLBACK_URL


        const requestBody = {    
            "BusinessShortCode": shortcode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": amount,    
            "PartyA":`254${phone}`,    
            "PartyB":shortcode,    
            "PhoneNumber":`254${phone}`,    
            "CallBackURL":`https://kicks-server-6p0n.onrender.com/api/order/callback?orderId=${order._id}&userId=${userId}`,    
            "AccountReference":"KICKS",    
            "TransactionDesc":"Test"
        }


        await axios.post(
            url,
            requestBody,
            {
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            }
        )
        .then((response) => {

            let resData = response.data

            res.status(200).json({success:true , order ,resData})

        })
       .catch((err) => {

            console.log("stk push error")

            res.status(400).json({success:false ,message:`${err.message}`})

        })
        
        
    }
    catch(error)
    {
        next(error)
    }

}


// callback
export const callback  = async (req,res,next) => {

    const {orderId ,userId} = req.query

    try
    {

        console.log("Callback is working")

        const callbackData = req.body
            
        if(!callbackData.Body.stkCallback.CallbackMetadata)
        {
            console.log(callbackData.Body)

            await Order.findByIdAndDelete(orderId)

             // send notification that the STK PUSH has been attended 
            sendEventToClients({success:true ,message:'STK Ppush has been attend to'})

            res.json("ok")
        }
        else
        {
            const body = req.body.Body.stkCallback.CallbackMetadata

            console.log(body)

            const order = await Order.findById(orderId)

            if(order)
            {
                
                await Order.findByIdAndUpdate(orderId ,{payment:true})

                console.log("order updated")

                await User.findByIdAndUpdate(userId ,{cartData:{}})

                console.log("cart cleared")

            }

            // Get amount
            const amountObj = body.Item.find(obj => obj.Name === 'Amount');

            const amount = amountObj.Value


            // Get Mpesa Code
            const codeObj = body.Item.find(obj => obj.Name === 'MpesaReceiptNumber');

            const trnx_id = codeObj.Value


            // Get Phone number
            const phoneNumberObj = body.Item.find(obj => obj.Name === 'PhoneNumber');

            const phone = phoneNumberObj.Value

            // TransactionDate
            const DateObj = body.Item.find(obj => obj.Name === 'TransactionDate');

            const date = DateObj.Value

            const pay = new Pay({
                amount,
                date,
                trnx_id,
                phone
            })

            await pay.save()

             // send notification that the STK PUSH has been attended 
            sendEventToClients({success:true ,message:'STK Ppush has been attend to'})
            
            res.status(200).json({success:true , pay})
        }

    }
    catch(error)
    {
        next(error)
    }

}


// cornfirmPayment
export const confirmPayment = async (req,res,next) => {

    const {orderId} = req.params

    const userId = req.user.id

    const token = req.token
    
    try
    {

        const auth = "Bearer " + token

        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"

        const date = new Date()

        const timestamp = 
            date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2) 

        const shortcode = process.env.PAYBILL

        const passKey = process.env.PASS_KEY

        const password = new Buffer.from(shortcode + passKey + timestamp).toString("base64")

        const requestBody = {    
            "BusinessShortCode":shortcode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "CheckoutRequestID": req.params.CheckoutRequestID,    
        } 

        const response = await axios.post(
            url,
            requestBody,
            {
                headers:{
                    "Authorization":auth
                }
            }
        )

        if(response.data.ResultCode === "0")
        {
            const order = await Order.findById(orderId)

            if(order)
            {
                console.log(order.items.length)
                
                for(const item of order.items)
                {
                    const productId = item._id

                    const quantity = Number(item.quantity) 

                    const product = await Product.findById(productId)
                    
                    console.log(productId)

                    if(product)
                    {
                        product.instock -= quantity

                        await product.save()
                    }
                    else
                    {
                        console.log("product not found")
                    }


                    // await Product.findByIdAndUpdate(productId, {$inc: {instock: -quantity}})
                    
                }

                await Order.findByIdAndUpdate(orderId ,{payment:true})

                console.log("order updated")

                await User.findByIdAndUpdate(userId ,{cartData:{}})

                console.log("cart cleared")

            }
            else
            {
                console.log("order not found")
            }

            res.status(200).json({success:true ,data:response.data , message:'Transaction was successfull'})

        }
        else
        {
            await Order.findByIdAndDelete(orderId)

            res.status(200).json({success:true ,data:response.data ,message:`${response.data.ResultDesc}`})
        }

    }
    catch(error)
    {
        next(error)
    }

}


// CASH ON DELIVERY
export const COD = async (req,res,next) => {

    const {items,delivery,amount,paymentmethod,address} = req.body

    const userId = req.user.id

    try
    {

        const newOrder = new Order({
            items,amount,paymentmethod,address,delivery,userId
        })

        await newOrder.save()

        await User.findByIdAndUpdate(userId ,{cartData:{}})

        res.status(200).json({success:true , newOrder})

    }
    catch(error)
    {
        next(error)
    }

}


// USER ORDERS
export const userOrders = async (req,res,next) => {

    const userId = req.user.id 

    if(!req.user.id)
    {
        return next(errorHandler(403 ,"You are not allowed to see the orders"))
    }

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404 ,"user not found"))
        }

        const orders = await Order.find({userId}).sort({_id:-1})

        res.status(200).json({success:true , orders})

    }
    catch(error)
    {
        next(error)
    }

}


// ADMIN ORDERS
export const adminOrders = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"your are no allowed to see all the order"))
    }

    const {status} = req.query

    try
    {
        const orders = await Order.find({
            ...(status && {status:status})
        }).sort({_id:-1})

        res.status(200).json({success:true , orders})
    }
    catch(error)
    {
        next(error)
    }

}


// UPDATE STATUS
export const updateStatus = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"you not allowed to update the order status"))
    }

    const {orderId,status} = req.body

    try
    {
        const order = await Order.findById(orderId)

        if(!order)
        {
            return next(errorHandler(404 ,"order not found"))
        }

        await Order.findByIdAndUpdate(orderId , {status:status})

        res.status(200).json({success:true , message:"status has been updated successfully"})
    }
    catch(error)
    {
        next(error)
    }

}


// DELETE ORDER
export const deleteOrder = async (req,res,next) => {

    const {orderId} = req.params

    try
    {
        const order = await Order.findById(orderId)

        if(!order)
        {
            return next(errorHandler(404,"order not found"))
        }

        await Order.findByIdAndDelete(orderId)

        res.status(200).json({success:true , message:"deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}