

import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useState } from 'react'
import { AiOutlineProduct, AiOutlineDeliveredProcedure } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandBootstrap } from "react-icons/tb";
import Graph from '../components/Graph'


export default function Dashboard() {

  const {stats,setStats,statsLoading,statsError,numofDays,setNumofDays,fetchStats} = useContext(StoreContext)

  const [data , setData] = useState([
    {
      title:"total products",
      value:(stats?.totalProducts || 0),
      icon:<AiOutlineProduct size={30}/>
    },
    {
      title:"total category",
      value:(stats?.categorys || 0),
      icon:<MdOutlineCategory size={30}/>
    },
    {
      title:"total brand",
      value:(stats?.brands || 0),
      icon:<TbBrandBootstrap size={30}/>
    },
    {
      title:"Pending Orders",
      value:(stats?.pendingOrders || 0),
      icon:< AiOutlineDeliveredProcedure size={30}/>
    }
  ])

  console.log(stats)

  // onDateChange
  const onDateChange = (e) => {

    setNumofDays(e.target.value)


  }

  return (

    <>

      {!statsLoading && !statsError && (

      
        <section className="section space-y-12">

          <h2 className="title2 text-center">Stats</h2>

          <div className="w-full space-y-5">

            <div className="w-full flex items-center justify-between">

              <span className="text-base font-semibold">Data from the last</span>

              <select  
                className="rounded-md text-sm font-semibold"
                onChange={onDateChange}
                value={numofDays}
              >

                <option value="7" >7 Days </option>

                <option value="14" >14 Days</option>

                <option value="30" >30 Days</option>

                <option value="90" >90 Days</option>

                <option value="180" >180 Days</option>

                <option value="365" >365 Days</option>

              </select>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                {data.map((stat,index) => (

                  <div key={index} className="border border-slate-300 shadow-md p-3">

                    <span className="flex justify-between">

                      <span className="text-base uppercase text-slate-600">{stat.title}</span>

                      <span className="">{stat.icon}</span>

                    </span>

                    <span className="">{stat.value}</span>

                  </div>

                ))}
              
            </div>

          </div>

          <div className="w-full">

            <Graph dt={stats?.salesStatus}/>

          </div>

        </section>

      )}


      {statsLoading && !statsError && (

        <Loading />

      )}


      {statsError && (

        <Error/>

      )}

    </>

  )

}
