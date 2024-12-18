

import React, { useContext } from 'react'
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
import { StoreContext } from '../context/store';



export default function Home() {

  const {products } = useContext(StoreContext)

  return (

   <section className="section">

    {/* new arrival */}
    <div className="space-y-5 pb-16">

      {/* header */}
      <div className="flex justify-between items-center">
        
        <h2 className="title2">New Arrival</h2>

        <div className="flex items-center gap-x-3">

          <div className="prev  z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronLeft size={32} className=""/>
          </div>

          <div className="next z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
              <MdChevronRight size={32} className=""/>
          </div>

        </div>

      </div>

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

         

      </div>

    </div>

    {/* featured products */}
    <div className="space-y-5 pb-16">

      {/* header */}
      <div className="flex justify-between items-center">
        
        <h2 className="title2">Featured Products</h2>

        <div className="flex items-center gap-x-3">

          <div className="prev  z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronLeft size={32} className=""/>
          </div>

          <div className="next z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
              <MdChevronRight size={32} className=""/>
          </div>

        </div>

      </div>

      {/* swiper */}
      <div className="w-full relative ">

          <Swiper
              className="mySwiper  relative z-40"
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

         

      </div>

    </div>


   </section>

  )
  
}
