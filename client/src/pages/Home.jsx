

import React, { useContext, useEffect, useState } from 'react'
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
import axios from "axios"
import Banner from '../components/Banner';



export default function Home() {


  const {products,url  } = useContext(StoreContext)

  const [offers ,setOffers] = useState([])

  const [latests ,setLatests] = useState([])

  const [featureds ,setFeatureds] = useState([])

  console.log(offers)

  console.log(featureds)

  console.log(latests)


  // offer products
  const fetchOffers = async () => {

    try
    {
       
      const res = await axios.get(url + "/api/product/get-products?offer=true") 

      if(res.data.success)
      {
        setOffers(res.data.products)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // featured products
  const fetchFeatured = async () => {

    try
    {
       
      const res = await axios.get(url + "/api/product/get-products?feature=true") 

      if(res.data.success)
      {
        setFeatureds(res.data.products)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // offer products
  const fetchLatest = async () => {

    try
    {
       
      const res = await axios.get(url + "/api/product/get-products?latest=true") 

      if(res.data.success)
      {
        setLatests(res.data.products)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  useEffect(() => {

    fetchOffers()

    fetchLatest()

    fetchFeatured()

  },[])

  return (

   <section className="">

    {/* Banner */}
    <Banner/>
    
    {/* new arrival */}
    <div className="section space-y-10">

      {/* header */}
      <div className="">
        
        <div className="space-y-5 w-full">

           <h2 className="text-4xl font-semibold font-title  text-center">New Arrival</h2>

           <h4 className="text-xl font-normal font-title  text-center text-gray-600">
            Explore our latest shoe collection-blending fashion and functionality
            for every step take
           </h4>

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
              {latests?.map((product,index) => (

                  <SwiperSlide key={index}>

                      <ProductCard product={product}/>

                  </SwiperSlide>

              ))}
          </Swiper>

          <div className="flex items-center gap-x-3">

            <div className="prevArrival absolute -left-1 top-1/3 z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronLeft size={32} className=""/>
            </div>

            <div className="nextArrival absolute -right-1 top-1/3 z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronRight size={32} className=""/>
            </div>

          </div>

      </div>

    </div>

    {/* OfferBanner */}
    <OfferBanner/>

    {/*products on offer*/}
    <div className="section space-y-10 ">

      {/* header */}
      <div className="">
        
        <div className="space-y-5 w-full">

           <h2 className="text-4xl font-semibold font-title  text-center">Get our Offers</h2>

           <h4 className="text-xl font-normal font-title  text-center text-gray-600">
              Browse our top diverse collection and find the perfect pair that suits your personality.
           </h4>

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
              {offers?.map((product,index) => (

                  <SwiperSlide key={index}>

                      <ProductCard product={product}/>

                  </SwiperSlide>

              ))}
          </Swiper>

          <div className="flex items-center gap-x-3">

            <div className="prevOffer absolute -left-1  top-1/3 z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronLeft size={32} className=""/>
            </div>

            <div className="nextOffer absolute -right-1  top-1/3 z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronRight size={32} className=""/>
            </div>

          </div>

      </div>

    </div>

    {/* featured products */}
    <div className="section space-y-5">

      {/* header */}
      <div className="space-y-5 w-full">
        
        <h2 className="text-4xl font-semibold font-title  text-center">Featured shoes</h2>

        <h4 className="text-xl font-normal font-title  text-center text-gray-600">
          View Our Most Selling 
        </h4>

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
              {featureds?.map((product,index) => (

                  <SwiperSlide key={index}>

                      <ProductCard product={product}/>

                  </SwiperSlide>

              ))}
          </Swiper>

          <div className="prevFeature absolute -left-1  top-1/3 z-40 h-5 w-5 bg-primary text-white  rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronLeft size={32} className=""/>
          </div>

          <div className="nextFeature absolute -right-1  top-1/3 z-40 h-5 w-5 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer">
              <MdChevronRight size={32} className=""/>
          </div>

      </div>

    </div>


   </section>

  )
  
}
