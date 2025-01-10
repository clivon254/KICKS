

import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {
  
  return (

    <div className="space-y-2">

        <div className="h-[250px] md:h-[280px] lg:h-[280px] md w-full shadow shadow-slate-200">

            <Link to={`/product/${product?._id}`}>

                <img 
                    src={product?.images[0]}
                    alt={`${product?.name}`}
                    className="h-full w-full object-fill"
                />

            </Link>

        </div>

        <div className="">

            <span className="text-center text-base font-semibold hover:underline">{product?.name}</span>

            <div className="text-sm text-gray-600">

                {product?.discountPrice > 0 ?
                (
                    <div className="flex flex-col te">

                        <span className="line-through font-light">
                            {(product?.regularPrice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                        </span>

                        <span className="font-semibold">
                            {(product?.discountPrice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                        </span>

                    </div>
                ) 
                :
                (
                    <span className="font-semibold">
                        {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                    </span>
                )}

            </div>

        </div>
        
    </div>

  )
}
