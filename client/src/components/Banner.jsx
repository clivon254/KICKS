

import React, { useEffect, useState } from 'react'
import Banner1 from "../assets/Banner1.png"
import Banner2 from "../assets/Banner2.png"
import Banner3 from "../assets/Banner3.png"
import Banner4 from "../assets/Banner4.png"
import Banner5 from "../assets/Banner5.png"

import { useNavigate } from 'react-router-dom'



export default function Banner() {

    const navigate = useNavigate()

    const [banners, setBanner] = useState([Banner1,Banner2,Banner3,Banner4,Banner5])

    const [image, setImage] = useState(banners.length > 0 ? banners[0] : null);

    console.log(image)

    // image
    const IMage = () => {

        setImage(banners[0])

    }

    useEffect(() => {

        IMage()

    },[])

    useEffect(() => {


        const interval = setInterval (() => {

            const currentIndex = banners.indexOf(image)

            const nextIndex = (currentIndex + 1) % banners

            setImage(banners[nextIndex])

        },3000)

        // clear
        return () => clearInterval(interval)

    },[image ,banners])

  return (

    <section className="w-full h-screen p-8 bg-gradient-to-t from-black/50 via-white">

        <div className="flex flex-col md:flex-row items-center h-full md:justify-between justify-around">

            {/* words */}
            <div className="w-full md:w-1/2 space-y-4">

               <h2 className="font-title text-6xl sm:text-7xl md:text-8xl  2xl:text-9xl font-black">
                Find the <br/>
                best shoes
               </h2>

               <p className="text-sm sm:text-base md:text-xl text-slate-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, explicabo libero nisi harum alias laudantium 
               </p>

               <button 
                    className="btn rounded-md"
                    onClick={() => navigate("/shop")}
                >
                Shop Now
               </button>
                 
            </div>

            {/* image */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-5 ">

                <img 
                    src={Banner1}
                    alt="" 
                    className="w-full h-[350px] " 
                />

            </div>

        </div>

    </section>

  )

}
