import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import Error from '../components/Error'
import axios from 'axios'
import { toast } from 'sonner'
import { FaTrashAlt } from 'react-icons/fa'
import { HiExclamationCircle } from "react-icons/hi"

export default function Orders() {

 
  const {url,token,orders,setOrders,ordersLoading,ordersError,fetchOrders,orderQuery,setOrderQuery} = useContext(StoreContext)

  
  const [open ,setOpen] = useState(false)


  const [orderIdToDelete ,setOrderIdToDelete] = useState(null)


  const orderPlaced = orders?.filter((order) => order.status === "Order Placed")

  const processing = orders?.filter((order) => order.status === "Processing")

  const  outforDelivery = orders?.filter((order) => order.status === "Out for Delivery")

  const delivered = orders?.filter((order) => order.status === "Delivered")
 
  const [orderData ,setOrderData] = useState([
    {
      title:"Order Placed",
      value:orderPlaced?.length,
    },
    {
      title:"Processing",
      value:processing?.length,
    },
    {
      title:"Out for delivery",
      value:outforDelivery?.length,
    },
    {
      title:"Delivered",
      value:delivered?.length,
    }
  ])

  console.log(processing)


  // status handler
  const statusHandler = async (event,orderId) => {

    try
    {
      const res = await axios.put(url + "/api/order/update-status",{orderId,status:event.target.value},{headers:{token}})

      if(res.data.success)
      {
        fetchOrders()

        toast.success("order updated successfully")
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // handleDelete
  const handleDelete = async () => {

    try
    {
      const res = await axios.delete(url + `/api/order/delete-order/${orderIdToDelete}`,{headers:{token}})

      if(res.data.success)
      {
        setOpen(false)

        setOrders((prev) => (
          prev.filter(order => order._id !== orderIdToDelete)
        ))

        toast.error('order deleted')
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }
  

  return (

    <>

      {!ordersLoading && !ordersError && (
      
        <section className="section space-y-10">

          <h1 className="title3 text-center">Orders</h1>

          {/* orders status */}
          <div className="w-full flex flex-wrap  gap-x-3 gap-y-1">

            {orderData?.map((order,index) => (

              <div 
                  key={index} 
                  onClick={() => setOrderQuery(order.title)}
                  className={`border border-slate-500 px-3 py-1 shadow rounded-md cursor-pointer text-sm font-semibold ${orderQuery === order.title ? "bg-primary text-white" :"bg-black text-white"}`}
              >
                {order.title} {order.value}
              </div>

            ))}

          </div>

          <div className="w-full">

            {orders.length > 0 ? 
            (
              <div className="w-full space-y-3">

                {orders.map((order,index) => (

                  <div 
                    className="w-full grid grid-col-1 sm:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-zinc-800 text-xs p-5 rounded-md"
                    key={index}
                  >

                     
                      <div className="">

                        {/* order items */}
                        <div className="">
                          {order?.items.map((item,index) => (

                              
                              <div 
                                key={index}
                                className="py-0.5 flex gap-x-3"
                              >

                                <img 
                                  src={item?.images[0]}
                                  alt="" 
                                  className="w-8 h-8" 
                                />

                                <div className="flex flex-col">

                                    <span className="">
                                      {item.name} X {item.quantity}
                                    </span>

                                    {item.color && (

                                      <span className="">color:{item.color}</span>

                                    )}

                                    {item.size && (

                                      <span className="">size:{item.size}</span>

                                    )}

                                </div>

                              </div>

                          ))}
                        </div>

                        {/* name */}
                        <div className="mt-3 font-medium">
                          {order.address.firstName + " "  +order.address.lastName}
                        </div>

                        {/* address */}
                        <div className="">

                          <p className="">{order.address.address}</p>

                          <p className="">{order.address.City}</p>

                        </div>

                        {/* phone */}
                        <p className="">
                          {order.address.phone}
                        </p>

                      </div>

                      <div className="">

                        <p className="">Items : {order?.items.length}</p>

                        <p className="">Method : {order?.paymentmethod}</p>

                        <p className="text-sm font-semibold text-blue-500">Payment : {order?.payment ? "Done" : "Pending  . . . "}</p>

                        <p className="">Date : {new Date(order.createdAt).toLocaleDateString()}</p>

                      </div>

                      {/* amount */}
                      <div className="">

                        <p className="">
                          Amount : {(order?.amount).toLocaleString('en-KE',{style:'currency' , currency :'KES'})}
                        </p>

                          <p className="">
                            Delivery : {order?.delivery.place} ,{(order?.delivery?.value).toLocaleString('en-KE',{style:'currency' , currency :'KES'})}
                          </p>

                      </div>

                      {/* actions */}
                      <div className="flex items-center gap-x-3">
                        
                        {/* status */}
                        <div className="text-xs">

                            <select 
                              value={order?.status}
                              onChange={(event) => statusHandler(event,order._id)}
                              className="rounded border border-zinc-800"
                            >

                              <option value="Order Placed" >Order Placed</option>

                              <option value="Processing" >Processing</option>

                              <option value="Out for delivery" >Out for delivery</option>

                              <option value="Delivered" >Delivered</option>

                            </select>

                        </div>

                        <span className="cursor-pointer">

                          <FaTrashAlt 
                              size={24} 
                              className="text-red-600"
                              onClick={() => {
                                setOpen(true)

                                setOrderIdToDelete(order._id)
                              }}
                          />

                        </span>

                      </div>

                  </div>

                ))}

              </div>
            ) 
            : 
            (
              <p className="text-center text-xl font-medium">There are no orders yet!!!</p>
            )}

          </div>

        </section>

      )}

      {!ordersError && ordersLoading && (

        <Loading />

      )}

      {ordersError && (

        <Error retry={fetchOrders}/>

      )}

      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md  bg-white transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={44} className="mx-auto"/>

                <h2 className="text-center">Are you sure you want to delete this Order ?</h2>

                <div className="flex justify-between items-center">

                  <button 
                    className="btn rounded-md"
                    onClick={() => handleDelete()}
                  >
                    Yes I'm sure
                  </button>

                  <button 
                    className="btn2 rounded"
                    onClick={() => setOpen(false)}
                  >
                    cancel
                  </button>

                </div>

            </div>

        </div>

      )}

   </>

  )

}
