

import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {
  
  return (

    <div>

        <div className="h-[250px] w-full">

            <Link to={`/product/${product._id}`}>

                <img 
                    src={product.images[0]}
                    alt={`${product.name}`}
                    className="h-full w-full object-fill"
                />

            </Link>

        </div>

        <div className="">

            <span className="text-center">{product.name}</span>

            <div className="text-sm">

                {product.discountPrice > 0 ?
                (
                    <div className="flex flex-col te">

                        <span className="line-through font-light">
                            {(product.regularPrice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                        </span>

                        <span className="">
                            {(product.discountPrice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                        </span>

                    </div>
                ) 
                :
                (
                    <span className="">
                        {(product.regularPrice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                    </span>
                )}

            </div>

        </div>
        
    </div>

  )
}
