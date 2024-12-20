

import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'
import axios from "axios"
import { toast } from 'sonner'



export default function AddCoupon() {

  const {url,token,} = useContext(StoreContext)

  const [Loading ,setLoading] = useState(false)

  const [error ,setError] = useState(false)

  const navigate = useNavigate()

  const [formData ,setFormData] = useState({})


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
      const res = await axios.post(url + "/api/coupon/create-coupon",formData,{headers:{token}})

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

  return (
    
    <section className="section  space-y-4 max-w-lg mx-auto">

      <h1 className="title2 text-center">Add Coupon</h1>

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
              disabled={Loading}
            >
              {Loading ? 
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

  )

}
