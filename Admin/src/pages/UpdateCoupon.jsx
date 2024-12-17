

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import axios from "axios"
import { toast } from 'sonner'
import Error from '../components/Error'
import Loading from '../components/Loading'



export default function UpdateCoupon() {

  const {url,token,} = useContext(StoreContext)

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(false)

  const navigate = useNavigate()

  const [formData ,setFormData] = useState({})

   const {couponId} = useParams()

   const [fetchCouponLoading ,setFetchCouponLoading] = useState(false)

   const [fetchCouponError ,setFetchCouponError] = useState(false)


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError(false)

    try
    {
      const res = await axios.put(url + `/api/coupon/update-coupon/${couponId}`,formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success(`coupon generated`)

        navigate('/coupons')
      }

    }
    catch(error)
    {
      console.log(error.message)

      setError(true)

      setLoading(false)

    }

  }

  // fetchCoupon
  const fetchCoupon = async () => {

    setFetchCouponLoading(true)

    try
    {
        const res = await axios.get(url + `/api/coupon/get-coupon/${couponId}`)

        if(res.data.success)
        {
            setFetchCouponLoading(false)

            setFormData(res.data.coupon)
        }

    }
    catch(error)
    {
        console.log(error.message)

        setFetchCouponError(false)
    }

  }  


  useEffect(() => {

    fetchCoupon()

  },[couponId])

  return (
    
    <>

        {!fetchCouponLoading && !fetchCouponError && (

            <section className="section space-y-5">

                    <h1 className="title2 text-center">Update Coupon</h1>

                    <form onSubmit={handleSubmit} className="w-full space-y-3">

                            <div className="flex flex-col gap-y-2">

                            <label htmlFor="" className="label">max uses</label>

                            <input 
                                type="number" 
                                className="input" 
                                placeholder='maximum uses'
                                value={formData.maxUses}
                                name="maxUses"
                                onChange={handleChange}
                            />

                            </div>

                            <div className="flex flex-col gap-y-2">

                            <label htmlFor="" className="label">discount</label>

                            <input 
                                type="number" 
                                className="input" 
                                placeholder='%discount'
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                            />

                            </div>

                            <div className="flex flex-col gap-y-2">

                            <label htmlFor="" className="label">Expiry date</label>

                            <input 
                                type="date" 
                                className="input w-full" 
                                placeholder='date'
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                            />

                            </div>

                            {/* button */}
                            <button 
                            className="btn w-full"
                            type="submit"
                            disabled={loading}
                            >
                            {loading ? 
                            (
                                <div className="flex items-center justify-center gap-x-3">

                                <span className="loading"/> loading . . . 

                                </div>
                            ) 
                            : 
                            ("submit")
                            }
                            </button>

                    </form>

            </section>
        )}

        {fetchCouponLoading && !fetchCouponError && (

            <>

                    <Loading/>

            </>

        )}

        {fetchCouponError && (

            <Error retry={fetchCoupon}/>
        )}


    </>

  )

}
