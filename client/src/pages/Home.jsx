

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
import OfferBanner from '../components/OfferBanner';



export default function Home() {

  const {products } = useContext(StoreContext)

  return (

   <section className="">

    {/* new arrival */}
    <div className="section space-y-5 ">

      {/* header */}
      <div className="flex justify-between items-center">
        
        <h2 className="title2">New Arrival</h2>

        <div className="flex items-center gap-x-2">

          <span className="text-xs font-semibold">show more</span>

          <div className="flex items-center gap-x-3">

            <div className="prevArrival  z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronLeft size={32} className=""/>
            </div>

            <div className="nextArrival z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronRight size={32} className=""/>
            </div>

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
                  slidesPerView: 4,
                  spaceBetween: 40,
                  },
              }} 
              navigation={{
              prevEl:'.prevArrival',
              nextEl:'.nextArrival'
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

    {/* OfferBanner */}
    <OfferBanner/>

    {/*products on offer*/}
    <div className="section space-y-5 ">

      {/* header */}
      <div className="flex justify-between items-center">
        
        <h2 className="title2">Get our offers</h2>
        
        <div className="flex items-center gap-x-2">
            
          <span className="text-xs font-semibold">show more</span>

          <div className="flex items-center gap-x-3">

            <div className="prevOffer  z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronLeft size={32} className=""/>
            </div>

            <div className="nextOffer z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronRight size={32} className=""/>
            </div>

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
                  slidesPerView: 4,
                  spaceBetween: 40,
                  },
              }} 
              navigation={{
              prevEl:'.prevOffer',
              nextEl:'.nextOffer'
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
    <div className="section space-y-5">

      {/* header */}
      <div className="flex justify-between items-center">
        
        <h2 className="title2">Featured Products</h2>

        <div className="flex items-center gap-x-2">

          <span className="text-xs font-semibold">show more</span>

          <div className="flex items-center gap-x-3">

            <div className="prevFeature  z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronLeft size={32} className=""/>
            </div>

            <div className="nextFeature z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronRight size={32} className=""/>
            </div>

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
                  slidesPerView: 4,
                  spaceBetween: 40,
                  },
              }} 
              navigation={{
              prevEl:'.prevFeature',
              nextEl:'.nextFeature'
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
