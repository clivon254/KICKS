
import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import Error from '../components/Error'
import {useSelector} from "react-redux"
import { Alert } from 'flowbite-react';
import { toast } from 'sonner';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import {  Autoplay,Navigation ,Pagination} from 'swiper/modules';
import ProductCard from '../components/ProductCard';

import { MdChevronLeft, MdChevronRight } from "react-icons/md"



export default function ProductPage() {

    const {url ,token ,products,getCart} = useContext(StoreContext)

    const {currentUser} = useSelector(state => state.user)

    const {productId} = useParams()
  
    const [product ,setProduct] = useState({})
  
    const [productLoading , setProductLoading] = useState(false)
  
    const [productError , setProductError] = useState(false)
  
    const [image ,setImage] = useState(null)

    const [sizing ,setSizing] = useState(null)

    const [coloring ,setcoloring] = useState(null)

    const [cartError ,setCartError] = useState(null)

    const [cartLoading ,setCartLoading] = useState(null)

    const navigate = useNavigate()
   
     
    // addToCart
    const addToCart = async () => {

        setCartError(null)

        setCartLoading(true)

        if(!currentUser)
        {
            navigate('/sign-in')

            setCartLoading(false)
        }

        let data ;

        if(product.sizes && product.colors)
        {

            if(sizing === null || coloring === null)
            {
                setCartError('Please select size and color')

                setCartLoading(false)

                return
            }

            data = {
                itemId : productId ,
                size : sizing ,
                color : coloring 
            }
        }
        else if(product.sizes)
        {
            if(sizing === null)
            {
                setCartError('Please select a size')

                setCartLoading(false)

                return
            }
    
            data = {
                itemId : productId ,
                size:sizing
            }
        }
        else if(product.colors)
        {

            if(coloring === null)
            {
                setCartError('Please select a color')

                setCartLoading(false)

                return
            }

            data = {
                itemId : productId ,
                color:coloring
            }

        }
        else
        {
            data = {
                itemId : productId 
            }
        }


        try
        {
            const res = await axios.post(url + "/api/cart/add-cart",data,{headers:{token}})

            if(res.data.success)
            {
                toast.success(`${res.data.message}`)

                getCart()

                setCartLoading(false)
            }

        }
        catch(error)
        {
            setCartLoading(false)

            if(error.response)
            {
                setCartError(error.response)

                console.log(error.response)
            }
            else
            {
                setCartError(error.response)
            }
        }

    }


     // fetch product
    const fetchProduct = async () => {

        try
        {
            setProductError(false)

            setProductLoading(true)

            const res = await axios.get(url + `/api/product/get-product/${productId}`)

            if(res.data.success)
            {
                setProduct(res.data.product)

                setProductLoading(false)

                setImage(res.data.product.images[0])
            }

        }
        catch(error)
        {
            console.log(error.message)

            setProductLoading(false)

            setProductError(true)
        }

    }

    useEffect(() => {

        fetchProduct()

    },[productId])


  return (

    <>

        {!productLoading && !productError && (
            
            <section className="section space-y-10">

                {/* uppersection */}
                <div className="w-full flex flex-col lg:flex-row gap-x-10 gap-y-14 ">

                    {/* left */}
                    <div className="w-full lg:w-3/5 space-y-3" >  

                        {/* main */}
                        <div className="max-h-[60vh] min-h-[60vh] h-[60vh] w-full border border-zinc-400">

                            <img 
                                src={image} 
                                alt="" 
                                className="h-full w-full object-fill" 
                            />

                        </div>

                        {/* thumb nails */}
                        <div className="image-thumb-nails w-full flex gap-x-3 overflow-hidden overflow-x-scroll ">

                            {product?.images?.map((url,index) => (
                                
                                <div className="min-h-20 min-w-20 max-h-20 max-w-20 bg-black">

                                    <img 
                                        key={index}
                                        src={url}
                                        alt="" 
                                        className={`w-full h-full object-fill border-2 cursor-pointer ${image === url ? "opacity-100 border-4 border-blue-600 ease-linear" : "opcacity-50 border-zinc-400"}`} 
                                        onClick={() => setImage(url)}
                                    />

                                </div>

                            ))}

                        </div>
       
                    </div>

                    {/* right */}
                    <div className="w-full lg:w-2/5 space-y-5">

                        {/* name */}
                        <div className="">
                               
                            <h2 className="title3">{product.name}</h2>

                        </div>
                        
                        {/* brand & category */}
                        <div className="text-xs space-x-3">

                            <span className="border border-zinc-800 rounded-full px-3 ">{product.category}</span>

                            <span className="border border-zinc-800 rounded-full px-3">{product.brand}</span>

                        </div>

                        {/* price */}
                        <div className="text-base font-semibold">

                            {product.discountPrice > 0 ? 
                                (
                                    <div className="flex items-center gap-x-3">

                                        <span className="">
                                            {(product?.discountPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                        </span>

                                        <span className="line-through text-xs">
                                             {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                        </span>

                                    </div>
                                ) 
                                : 
                                (
                                    <span className="">
                                        {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                    </span>
                                )
                            }

                        </div>

                        {/* description */}
                        <div className="">

                            <div 
                                className="font-normal text-sm"
                                dangerouslySetInnerHTML={{__html:product?.description}}
                            />

                        </div>

                        {/* color */}
                        <div className="space-y-2">

                            <p className="text-xs font-semibold">Available colors</p>

                            <div className="flex gap-x-3 items-center">

                                {product?.colors?.map((color,index) => (
                                   
                                   <>

                                        <div className={`${color.color === coloring && ("border-2 border-blue-800  h-9 w-9 rounded-full flex items-center justify-center")}`}>
                                            
                                            <span 
                                                key={index} 
                                                className={`bg-[${color.hex}]  p-3 block h-6 w-6 border border-zinc-800 rounded-full cursor-pointer`}
                                                onClick={() => setcoloring(color.color)}
                                            />

                                        </div>
                                        
                                    </>

                                ))}

                            </div>

                        </div>

                        {/* size */}
                        <div className="w-full space-y-2">

                            <p className="text-xs font-semibold">Available sizes</p>

                            <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                                {product?.sizes?.map((size,index) => (

                                    <span 
                                        key={index} 
                                        className={`px-3 py-1 cursor-pointer ${size === sizing ? "border-blue-800 border-4" :"border-black border-2"}`}
                                        onClick={() => setSizing(size)}
                                    >
                                      {size}
                                    </span>

                                ))}
                            </div>

                        </div>
                        
                        {cartError && (

                            <Alert color="failure">
                                {cartError}
                            </Alert>

                        )}

                        {/* buttons */}
                        <div className="flex flex-col gap-y-3">

                            <button 
                                className="btn"
                                onClick={() => addToCart()}
                                disabled={cartLoading}
                            >
                                {cartLoading ? 
                                (
                                    <div className="flex justify-center items-center">
                                        <span className="loading"/>
                                    </div>
                                ) 
                                : 
                                ("ADD TO CART")}
                            </button>

                            <button className="btn2">
                                BUY NOW
                            </button>

                        </div>

                    </div>

                </div>

                {/* lowersection */}
                <div className="">
                    
                    {/* Reveiws */}
                    <div className=""></div>

                    {/* related products */}
                    <div className="space-y-5">
                        
                        <h2 className="title3">Related Products</h2>
                        
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

                            <div className="prev absolute top-1/3 -left-4 z-40 h-10 w-10 bg-blue-800 text-white  rounded-full flex justify-center items-center cursor-pointer">
                                <MdChevronLeft size={32} className=""/>
                            </div>

                            <div className="next absolute top-1/3 -right-4 z-40 h-10 w-10 bg-blue-800 text-white rounded-full flex justify-center items-center cursor-pointer">
                                <MdChevronRight size={32} className=""/>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        )} 

        {productLoading && !productError && (

            <Loading/>

        )}

        {productError && (

            <Error retry={fetchProduct}/>

        )}
 
      
    </>
  );
}
