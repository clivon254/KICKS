

import React from 'react'
import Banner from "../assets/OfferBanner.jpeg"
import { useNavigate } from 'react-router-dom'


export default function OfferBanner() {

    const navigate = useNavigate()

  return (

    <div 
        className="h-[60vh] sm:h-[65vh] md:h-[70vh]  lg:h-[75vh] grid place-content-center"
        style={{
            backgroundImage: `url(${Banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >

        <div className="flex flex-col items-center gap-y-5 sm:gap-y-8 md:gap-y-10 lg:gap-y-12 ">

            <h2 className="text-center text-white text-2xl sm:text-3xl  lg:text-4xl font-bold">BIG SALE</h2>

            <h1 className="text-center text-white text-4xl sm:text-5xl md:text-6xl  lg:text-7xl font-black ">
                UP TO 30 %  OFF
            </h1>

            <h1 className="text-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                IMPROVE YOUR SHOE GAME WITH LESS
            </h1>

            <button 
                className=" border-4 border-secondary hover:bg-secondary hover:text-zinc-500 text-secondary px-5 py-3 text-xl  sm:text-2xl md:text-3xl xl:text-4xl font-bold"
                onClick={() => navigate('/shop')}
            >
                SHOP NOW
            </button>

        </div>

    </div>

  )
}
