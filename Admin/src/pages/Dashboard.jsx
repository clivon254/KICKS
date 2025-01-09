

import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineProduct } from "react-icons/ai";
import { TbBrandBootstrap ,TbCategory2,TbTruckDelivery} from "react-icons/tb";
import { SiStockx } from "react-icons/si";




export default function Dashboard() {

  const {stats,setStats,statsLoading,statsError,fetchStats,token} = useContext(StoreContext) 


  const [data ,setData] = useState([
    {
      title:"Total Products",
      value:(stats?.totalProducts || 0),
      icon:<AiOutlineProduct size={24}/>
    },
    {
      title:"Total Categories",
      value:(stats?.categorys || 0),
      icon:<TbCategory2 size={24}/>
    },
    {
      title:"Total brands",
      value:(stats?.brands || 0),
      icon:<TbBrandBootstrap size={24}/>
    },
    {
      title:"Out of Stock",
      value:stats?.outOfStock,
      icon:<SiStockx size={24}/>
    },
    {
      title:"Pending Orders",
      value:(stats?.pendingOrders),
      icon:<TbTruckDelivery size={24}/>
    }
  ])

  console.log(stats?.brands)
  
  console.log(data)

  return (

   <>

      {!statsLoading && !statsError && (

        <section className="section">

          <h2 className="title2 text-center">Stats</h2>

          {/* stats */}
          <div className="gap-y-8 gap-x-5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {data?.map((stat,index) => (

              <div key={index} className="flex flex-col shadow-md border-slate-200 p-3 border">

                <span className="flex justify-between">

                  <span className="text-xl font-semibold text-slate-600">
                    {stat.title} 
                  </span>

                  <span className="">
                    {stat.icon}
                  </span>

                </span>

                <span className="">
                  {stat.value}
                </span>

              </div>

            ))}

          </div>

         {/* graph */}
         <div className=""></div>
          
        </section>

      )}

      {statsLoading && !statsError && (

        <Loading/>

      )}

      {statsError && (

        <Error retry={fetchStats}/>

      )}

   </>

  )

}
