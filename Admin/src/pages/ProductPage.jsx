
import React, { useRef, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import Error from '../components/Error'


export default function ProductPage() {

    const {url ,token} = useContext(StoreContext)

    const {productId} = useParams()
  
    const [product ,setProduct] = useState({})
  
    const [productLoading , setProductLoading] = useState(false)
  
    const [productError , setProductError] = useState(false)
  
    const [image ,setImage] = useState(null)

    const [sizing ,setSizing] = useState(null)

    const [coloring ,setcoloring] = useState(null)
   
    console.log(product)

    console.log(product.images)

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

    },[])

  return (

    <>

        {!productLoading && !productError && (
            
            <section className="section">

                {/* uppersection */}
                <div className="flex flex-col lg:flex-row gap-x-15 gap-y-10 ">

                    {/* left */}
                    <div className="w-full lg:w-3/5">
                        
                        {/* image container */}
                        <div className="space-y-3">

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
                              
                    </div>

                    {/* right */}
                    <div className="">

                        {/* name */}
                        <div className="">
                               
                            <h2 className="">{product.name}</h2>
                            
                            <h4 className="">{product.category}</h4>

                        </div>

                        {/* price */}
                        <div className="">

                            {product.disccountPrice > 0 ? 
                                (
                                    <div className="">

                                        <span className="">
                                            {(product?.discountPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                        </span>

                                        <span className="">
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
                                className=""
                                dangerouslySetInnerHTML={{__html:product?.description}}
                            />

                        </div>

                        {/* color */}
                        <div className="">

                            <p className="">Available colors</p>

                            <div className="">

                                {product?.colors?.map((color,index) => (

                                    <span key={index} className={`bg-[]`}>
                                        {color.hex}
                                    </span>

                                ))}
                                
                            </div>

                        </div>

                        {/* size */}
                        <div className="w-full">

                            <p className="">Available sizes</p>

                            <div className="flex gap-x-2 gap-y-1 flex-wrap">
                                {product?.sizes?.map((size,index) => (

                                    <span 
                                        key={index} 
                                        className={`px-3 py-1 ${size === sizing ? "border-blue-800 border-4" :"border-black border-2"}`}
                                        onClick={() => setSizing(size)}
                                    >
                                      {size}
                                    </span>

                                ))}
                            </div>

                        </div>

                        {/* button */}
                        <div className="flex flex-col gap-y-3">

                            <button className="btn">
                                ADD TO CART
                            </button>

                            <button className="btn2">
                                BUY NOW
                            </button>

                        </div>

                    </div>

                </div>

                {/* lowersection */}
                <div className=""></div>

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
