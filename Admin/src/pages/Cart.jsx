

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {toast} from "sonner"
import axios from "axios"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import {  Autoplay,Navigation ,Pagination} from 'swiper/modules';
import ProductCard from '../components/productCard';

import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { FaLongArrowAltRight } from 'react-icons/fa'


export default function Cart() {

    const {cartData ,url,token,setCartData,products,cartAmount,getCart} = useContext(StoreContext)

    // handleCartIncrease
    const handleCartIncrease = async (product,item) => {

       
        let data ;

        if(product.sizes && product.colors)
        {

            data = {
                itemId : item._id ,
                size : item.size ,
                color : item.color
            }
        }
        else if(product.sizes)
        {  
    
            data = {
                itemId : item._id ,
                size : item.size 
            }
        }
        else if(product.colors)
        {

            data = {
                itemId : item._id ,
                color : item.color
            }
        }
        else
        {
            data = {
                itemId : item._id ,
            }
        }


        try
        {
            const res = await axios.post(url + "/api/cart/add-cart",data,{headers:{token}})

            if(res.data.success)
            {
                toast.success(`${res.data.message}`)

                getCart()

            }

        }
        catch(error)
        {
           
            console.log(error.messsage)
        }

    }

    // handleCartIncrease
    const handleCartDecrease = async (product,item) => {

       
        let data ;

        if(product.sizes && product.colors)
        {

            data = {
                itemId : item._id ,
                size : item.size ,
                color : item.color
            }
        }
        else if(product.sizes)
        {  
    
            data = {
                itemId : item._id ,
                size : item.size 
            }
        }
        else if(product.colors)
        {

            data = {
                itemId : item._id ,
                color : item.color
            }
        }
        else
        {
            data = {
                itemId : item._id ,
            }
        }


        try
        {
            const res = await axios.post(url + "/api/cart/remove-cart",data,{headers:{token}})

            if(res.data.success)
            {
                toast.error(`${res.data.message}`)

                getCart()
            }

        }
        catch(error)
        {
            
            console.log(error.mesage)
           
        }
    }

  return (

    <>

        {cartData?.length > 0 ? (

            <section className="section space-y-12">
            
                {/* upper section */}
                <div className="space-y-7 pt-5">
                    
                    {/* header */}
                    <div className="flex items0center justify-between">

                        <h2 className="title3">Your Cart</h2>

                        <Link to="/shop">

                            <span className="underline text-base font-semibold">continue shopping</span>

                        </Link>

                    </div>

                    <div className="space-y-8">
                    
                        {/* table */}
                        <div className="tabler">

                            <Table>

                                <Table.Body className="table-title">

                                    <Table.Row>

                                        <Table.Cell>image</Table.Cell>

                                        <Table.Cell>details</Table.Cell>

                                        <Table.Cell>quantity</Table.Cell>

                                        <Table.Cell>price</Table.Cell>

                                    </Table.Row>

                                </Table.Body>

                                {cartData?.map((item,index) => {

                                    const product = products.find((product) => product._id === item._id)

                                    return (

                                        <Table.Body>

                                            <Table.Row>

                                                <Table.Cell>

                                                    <div className="h-20 w-20 min-w-20 min-h-20">

                                                        <img 
                                                            src={product.images[0]} 
                                                            alt="" 
                                                            className="w-full h-full" 
                                                        />

                                                    </div>
                                                </Table.Cell>

                                                <Table.Cell>

                                                    <div className="flex flex-col">

                                                        <span className="font-medium text-black underline">{product.name}</span>

                                                        {item?.size && ( 
                                                            <span className="">
                                                                size:{item.size}
                                                            </span> 
                                                        )}

                                                        {item?.color && ( 
                                                            <span className="">
                                                                color:{item.color}
                                                            </span> 
                                                        )}

                                                    </div>

                                                </Table.Cell>

                                                <Table.Cell>

                                                    <div className="flex items-center">

                                                        <span 
                                                            className="quantity cursor-pointer"
                                                            onClick={() => handleCartDecrease(product,item)}
                                                        >
                                                            -
                                                        </span>

                                                        <span className="quantity">{item.quantity}</span>

                                                        <span 
                                                          className="quantity cursor-pointer"
                                                          onClick={() => handleCartIncrease(product,item)}
                                                        >+</span>

                                                    </div>

                                                </Table.Cell>

                                                <Table.Cell>
                                                    {((product.discountPrice > 0 ? product.discountPrice : product.regularPrice) * item.quantity).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                                </Table.Cell>

                                            </Table.Row>

                                        </Table.Body>
                                    )

                                })}

                            </Table>

                        </div>
                        
                        {/* cart total */}
                        <div className="space-y-5">

                            <h2 className="title3">Cart total</h2>

                            <div className="flex items-center justify-between ">

                                <span className="text-base font-semibold">Amount</span>

                                <span className="text-sm text-black font-medium">
                                    {(cartAmount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                </span>

                            </div>

                            <button className="btn2 font-medium w-full">

                                <Link to="/checkout">
                                    PROCEED TO CHECK OUT
                                </Link>

                            </button>

                        </div>


                    </div>



                </div>


                {/* lower section */}
                <div className="">

                    {/* Featured products */}
                    <div className="space-y-5">
                        
                        <h2 className="title3">Featured Products</h2>
                        
                        {/* swiper */}
                        <div className="w-full relative ">

                            <Swiper
                                className="mySwiper  relative"
                                spaceBetween={10}
                                slidesPerView={4}
                                // loop={true}
                                autoPlay={
                                {
                                    delay:2000,
                                    disableOnInteraction:false
                                }
                                }
                                modules={[Autoplay,Navigation]}
                                breakpoints={{
                                    0: {
                                    slidesPerView: 2,
                                    spaceBetween:20
                                    },
                                    640: {
                                    slidesPerView:3 ,
                                    spaceBetween: 30,
                                    },
                                    768: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                    },
                                    1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 40,
                                    },
                                }} 
                                navigation={{
                                prevEl:'.prev',
                                nextEl:'.next'
                            }}
                            >
                                {products?.map((product,index) => (

                                    <SwiperSlide key={index}>

                                        <ProductCard product={product}/>

                                    </SwiperSlide>

                                ))}
                            </Swiper>

                            <div className="prev absolute top-1/3 -left-4 z-40 h-10 w-10 bg-blue-800  rounded-full flex justify-center items-center cursor-pointer">
                                <MdChevronLeft size={32} className="text-white"/>
                            </div>

                            <div className="next absolute top-1/3 -right-4 z-40 h-10 w-10 bg-blue-800  rounded-full flex justify-center items-center cursor-pointer">
                                <MdChevronRight size={32} className="text-white"/>
                            </div>

                        </div>

                    </div>

                </div>
                

            </section>

        ) 
        : 
        (
            <div className="max-w-lg mx-auto">

                <div className="pt-20 min-h-[60vh] flex items-center justify-enter flex-col gap-y-5">

                    <p className="font-medium text-center xl:font-bold text-xl">Your cart empty</p>

                    <button className="btn rounded font-semibold">
                        
                        <Link 
                            to="/shop"
                            className="flex items-center gap-x-5"
                        >
                            Return to shop 
                            <span className=""><FaLongArrowAltRight size={30}/></span>
                        </Link>

                    </button>

                </div>

            </div>
        )
        }



    </>

  )

    }
