

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import MPESA from "../assets/MPESA.png"
import COD from "../assets/COD.png"
import axios from 'axios'
import { Alert } from 'flowbite-react'
import {toast} from "sonner"

export default function CheckOut() {

    const {url,token,cartData,cartAmount,cartItems,products} = useContext(StoreContext)

    const [data,setData] = useState({})

    const [paymentmethod ,setPaymentMethod] = useState(false)

    const [delivery ,setDelivery] = useState(null)

    const [error ,setError] = useState(null)

    const [loading ,setLoading] = useState(false)

    const navigate = useNavigate()

    const [shipping ,setShipping] = useState([
        {
          place:"self pick up",
          value:0,
        },
        {
          place:"Co operative",
          value:20,
        },
        {
          place:"Gataka",
          value:50,
        },
        {
          place:"Hardy",
          value:100,
        },
        {
          place:"Karen",
          value:100,
        },
        {
          place:"Rongai",
          value:100,
        },
        {
          place:"CBD",
          value:150,
        }
      ])

    const [payment ,setPayment] = useState([
        {
            value:"MPESA",
            img:MPESA,
        },
        {
            value:"COD",
            img:COD,
        }
    ])

    let TotalAmount = Number(cartAmount) + Number(delivery?.value || 0)


    // onChangeData
    const onChangeData = (e) => {

        setData({...data ,[e.target.name]:e.target.value})

    }

    

    // place order
    const placeOrder = async (e) => {

        e.preventDefault()

        setError(null)

        setLoading(true)

        if(!paymentmethod)
        {
            setError("Please select a payment method")

            setLoading(false)

            return
        }

        let orderItems = []

        for(const items in cartItems)
        {

            let hasSizes = false

            if(typeof cartItems[items] === 'object')
            {

                for(const size in cartItems[items])
                {
        
                        hasSizes = true
        
                        if(typeof cartItems[items][size] === 'object')
                        {
        
                            for(const color in cartItems[items][size])
                            {
                                const quantity = cartItems[items][size][color]
        
                                if(quantity > 0 )
                                {
        
                                    const iteminfo = products.find((product) => product._id === items)

                                    if(iteminfo)
                                    {
                                        iteminfo.quantity = quantity

                                        iteminfo.size = size

                                        iteminfo.color = color

                                        orderItems.push(iteminfo)
                                    }
        
                                }
        
                            }
        
                        }
                        else
                        {
                            const quantity = cartItems[items][size]
        
                            if(quantity > 0)
                            {
        
                                const itemInfo = products.find((product) => product._id === items)

                                if(itemInfo)
                                {
                                    itemInfo.quantity = quantity

                                    itemInfo.size = size

                                    orderItems.push(itemInfo)
                                }

                            }

                        }
        
                }
        
                // If there are no sizes, check for colors directly
                if (!hasSizes) {
    
                    for (const color in cartItems[items]) {
    
                        const quantity = cartItems[items][color]
        
                        if(quantity > 0)
                        {
    
                            const itemInfo = products.find((product) => product._id === items)

                            if(itemInfo)
                            {
                                itemInfo.quantity = quantity

                                itemInfo.color = color
                                
                                orderItems.push(itemInfo)
                            }
                            
                        }

                    }
                }

            }
            else
            {

                if(cartItems[items] > 0)
                {
                    const iteminfo = products.find((product) => product._id === items)

                    if(iteminfo)
                    {
                        iteminfo.quantity = cartItems[items]

                        orderItems.push(iteminfo)
                    }

                }

            }

        }

        let orderData = {
            address:data,
            items:orderItems,
            paymentmethod,
            delivery,
            amount:TotalAmount
        }

        switch(paymentmethod)
        {

            case 'MPESA':
                try
                {
                    const res = await axios.post(url + "/api/order/mpesa",orderData,{headers:{token}})

                    if(res.data.success)
                    {
                        toast.success("prompt sent to your phone")

                        setLoading(false)

                        const orderId = res.data.order._id 

                        const CheckoutRequestID = res.data.resData.CheckoutRequestID

                        navigate(`/confirm-payment/${CheckoutRequestID}/${orderId}`)

                        setData({})

                        setDelivery(null)

                        setPaymentMethod(null)

                    }

                }
                catch(error)
                {
                    
                    if(error.response)
                    {
                        setError(error.response.data.message)

                        setLoading(false)

                        console.log(error.response.data.message)
                    }
                    else
                    {
                        setError(error.message)

                        setLoading(false)

                        console.log(error.message)
                    }
                    
                }
                break;
            case 'COD':
                try
                {
                    const res = await axios.post(url + "/api/order/COD",orderData,{headers:{token}})

                    if(res.data.success)
                    {
                        setLoading(false)

                        toast.success('Order completed successfully')

                        navigate('/orders')

                        setPaymentMethod(null)

                        setDelivery(null)

                        setData({})

                    }

                }
                catch(error)
                {
                    console.log(error.message)

                    setError(error.message)

                    setLoading(false)
                }
                break;
            default:

                console.log("Invalid payment method")

                setError("select a method of payment")

                setLoading(false)

                break;
            
        }

    }


  return (
    
    <section className="section">

        <form onSubmit={placeOrder} className="flex flex-col lg:flex-row gap-y-10 gap-x-24">

            {/* Billing data */}
            <div className="w-full lg:w-[60%] space-y-10">

                {/* contact */}
                <div className="space-y-2 w-full">

                    <h2 className="text-base font-semibold">Contact</h2>

                    <input 
                        type="text" 
                        className="input w-full" 
                        placeholder='(07XXXXXX) *mpesa'
                        name="phone"
                        onChange={onChangeData}
                        value={data.phone}
                    />

                </div>

                {/* address info */}
                <div className="w-full space-y-2">

                    <h3 className="text-base font-semibold">Billing Address</h3>

                    <div className="w-full space-y-3 ">

                        <input 
                            type="text" 
                            className="input w-full"
                            name="country" 
                            value={data.country}
                            placeholder='KENYA'
                        />

                        <div className="w-full flex flex-col lg:flex-row gap-3">

                            <input 
                                type="text" 
                                className="w-full input"
                                onChange={onChangeData}
                                name="firstName"
                                placeholder='First Name'
                                value={data.firstName}
                                required
                            />

                            <input 
                                type="text" 
                                className="w-full input"
                                onChange={onChangeData}
                                placeholder='Last Name'
                                name="lastName"
                                value={data.lastName}
                                required
                            />

                        </div>

                        <input 
                            type="text" 
                            className="w-full input"
                            onChange={onChangeData}
                            name="adress"
                            placeholder='Address'
                            value={data.address}
                            required
                        />

                        <div className="w-full flex flex-col lg:flex-row gap-3">

                            <input 
                                type="text" 
                                className="w-full input"
                                onChange={onChangeData}
                                name="City"
                                placeholder=' City'
                                value={data.City}
                                required
                            />

                            <input 
                                type="text" 
                                className="w-full input"
                                onChange={onChangeData}
                                placeholder='post code (optional)'
                                name="postcode"
                                value={data.postcode}
                            />

                        </div>

                    </div>

                </div>
                
                {/* shipping */}
                <div className="w-full space-y-3">

                    <h2 className="text-base font-semibold">Shipping fee</h2>

                    <div className="w-full">

                        {shipping.map((ship,index) => (

                            <div 
                                key={index} 
                                className="w-full flex items-center gap-x-5 px-3 py-5 border border-zinc-800 "
                            >

                                <input 
                                    type="radio" 
                                    className="" 
                                    onChange={() => setDelivery(ship)}
                                    name={delivery}
                                />

                                <div className="flex-1 flex justify-between items-center">

                                    <span className="text-sm font-semibold">{ship.place}</span>

                                    <span className="text-sm font-semibold">
                                        {(ship.value).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>


            </div>

            {/* order summary */}
            <div className="w-full lg:w-[60%] space-y-5">

                <h2 className="text-base font-semibold">Order summary</h2>

                {/* products */}
                <div className="space-y-2">

                    {cartData?.map((item,index) => {

                        const product = products.find((product) => product._id === item._id)
                        
                        if(product)
                        {

                            return(

                                <div 
                                    className="flex items-start justify-between gap-x-5"
                                    key={index}
                                >

                                    <div className="flex items-start gap-x-5">

                                        <div className="h-12 w-12 min-h-12 min-w-12 relative">

                                            <img 
                                                src={product?.images[0]}
                                                alt="" 
                                                className="h-full w-full" 
                                            />
                                            
                                            <span className="absolute top-0 -right-2 h-6 w-6 bg-primary text-white rounded-full grid place-content-center">
                                                {item.quantity}
                                            </span>

                                        </div>

                                        <div className="flex flex-col text-xs font-medium">

                                            <span className="">{product?.name}</span>

                                            {item?.size && (

                                                <span className="">size : {item?.size}</span>

                                            )}

                                            {item?.color && (

                                                <span className="">color :{item?.color}</span>

                                            )}

                                        </div>

                                    </div>

                                    <div className="text-sm">
                                        {(item.quantity * product?.discountPrice > 0 ? product?.discountPrice : product?.regularPrice).toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}
                                    </div>

                                </div>

                            )

                        }

                    })}

                </div>

                <hr className="" />

                {/* cart Total */}
                <div className="flex items-center justify-between">

                    <span className="text-base font-semibold">cart Total</span>

                    <span className="text-sm ">
                        {cartAmount?.toLocaleString('en-KE',{style:'currency',currency:'KES'})}
                    </span>

                </div>

                <hr className="" />

                {/* delivery */}
                <div className="flex items-center justify-between">

                    <span className="text-base font-semibold">Delivery fee</span>

                    <span className="text-sm">
                        {(delivery?.value || 0)?.toLocaleString('en-KE',{style:'currency',currency:'KES'})}
                    </span>

                </div>

                <hr className="" />
                
                {/* Total */}
                <div className="flex items-center justify-between">

                    <span className="text-base font-semibold">Total</span>

                    <span className="font-bold">
                        {(TotalAmount).toLocaleString('en-KE',{style:'currency',currency:'KES'})}
                    </span>

                </div>

                <hr className="" />

                {/* method of payment */}
                <div className="">

                    <h2 className="text-base font-semibold">Select method of payment</h2>

                    <div className="">
                        {payment.map((pay,index) => (

                            <div 
                                key={index} 
                                className="flex items-center gap-x-5"
                            >

                                <input 
                                    type="radio" 
                                    name="paymentmethod"
                                    value={pay.value}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />

                                <div className="h-20 w-24">

                                    <img 
                                        src={pay.img}
                                        alt="" 
                                        className="w-full h-full" 
                                    />

                                </div>

                            </div>

                        ))}
                    </div>

                </div>


                <button 
                    className="btn w-full"
                    type='submit'
                    disabled={loading}
                    onClick={() => placeOrder()}
                >
                    
                    {loading 
                        ? 
                        (
                            <div className="flex items-center justify-center gap-x-3">
                                <span className="loading"/> loading . . . 
                            </div>
                        ) 
                        : 
                        ("PLACE ORDER")
                    }
                </button>

                {error && (

                    <Alert color="failure">{error}</Alert>

                )}


            </div>

        </form>

    </section>

  )

}
