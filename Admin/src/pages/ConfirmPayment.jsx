

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { Link, useParams } from 'react-router-dom'
import { GiCancel } from "react-icons/gi"
import { TiInputChecked } from "react-icons/ti"
import axios from "axios"

export default function ConfirmPayment() {

    const {url,token,getCart} = useContext(StoreContext)

    const [processingPayment ,setProcessingPayment] = useState(false)

    const [paymentSuccess ,setPaymentSuccess] = useState(false)

    const [paymentError ,setPaymentError] = useState(false)

    const [message ,setMessage] = useState(null)

    const {CheckoutRequestID ,orderId} = useParams()

    useEffect(() => {

        setProcessingPayment(true)

        const confirmPayment = async () => {

            setProcessingPayment(true)

            try
            {
                const res = await axios.post(url + `/api/order/confirm-payment/${CheckoutRequestID}/${orderId}`,{},{headers:{token}})

                if(res.data.success)
                {

                    if(res.data.data.ResultCode === "0")
                    {
                        setPaymentError(false)

                        setProcessingPayment(false)

                        setPaymentSuccess(true)

                        setMessage(res.data.message)
                    }
                    else
                    {
                        setPaymentError(true)

                        setProcessingPayment(false)

                        setPaymentSuccess(false)

                        setMessage(res.data.message)
                    }

                }
        

                getCart()
            }
            catch(error)
            {
                if(error.response)
                {
                    const errorMessage = error.response.data.message
                    
                    setPaymentError(true)

                    console.log(errorMessage)

                    setPaymentSuccess(false)

                    setMessage(errorMessage)

                }
                else
                {
                    setPaymentError(true)

                    console.log(error.message)

                    setPaymentSuccess(false)

                    setMessage(error.Message)
                }
                
            }
            finally
            {
                setProcessingPayment(false)
            }

        }

        const timeoutId = setTimeout(() => {

            confirmPayment()

        },45000)

        return () => clearTimeout(timeoutId)

    },[CheckoutRequestID,orderId])

  return (

    <section className="section">

        {paymentSuccess && !paymentError && !processingPayment && (

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] shadow-xl rounded-md flex flex-col items-center gap-y-3 p-5">

                    <span className="">

                        <TiInputChecked size={50} className="text-green-500"/>

                    </span>

                    <p className="text-center text-base font-medium">
                        {message}
                    </p>
                    
                    <button className="btn2 ">

                        <Link to="/orders">

                            proceed to orders

                        </Link>

                    </button>

                </div>

            </div>

        )}

        {!paymentSuccess && !paymentError && processingPayment && (

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] shadow-xl rounded-md flex flex-col items-center gap-y-3 p-5">

                    <div className="flex items-center justify-center gap-x-3 text-sm font-semibold">

                        <span className="loading"/> processing payment 

                    </div>

                    <p className="text-center text-base font-medium">This might take a minute</p>

                </div>

            </div>

        )}

        {paymentError && (

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] shadow-xl rounded-md flex flex-col items-center gap-y-3 p-5">

                    <span className="text-red-600">

                        <GiCancel size={44}/>

                    </span>

                    <p className="text-center text-base font-title font-semibold">
                        {message}
                    </p>

                    <button className="btn2 rounded">
                        <Link to="/checkout">
                            back to cart
                        </Link>
                    </button>

                </div>

            </div>

        )}

    </section>

  )
}
