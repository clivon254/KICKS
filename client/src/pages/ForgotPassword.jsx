

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/store'
import {toast} from "sonner"
import {Alert} from "flowbite-react"
import Logo from '../components/Logo'


export default function ForgotPassword() {

  const {url} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const [success ,setSuccess] = useState(false)

  console.log(formData)

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData ,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

      setSuccess(null)
      
      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/auth/forgot-password",formData)

      if(res.data.success)
      {
        setLoading(false)

        toast.success("Link sent to your email")

        setSuccess("Link sent to your email")
        
        setFormData({})
      }

    }
    catch(error)
    {

      if(error.response)
      {
        const errorMessage = error.response.data.message 

        setError(errorMessage)

        setLoading(false)

        setSuccess(null)
      }
      else
      {
        setError(errorMessage)

        setLoading(false)

        setSuccess(null)
      }

    }

  }

  return (

    <div className="section flex items-center justify-center min-h-screen">

      <div className="w-full max-w-xl mx-auto">

        {/* logo */}
        <div className="flex justify-center items-center">

          <Logo/>
          
        </div>

        {/* form */}
        <div className="space-y-10">

          <h1 className="text-center title3">Forgot password</h1>

          <p className="text-center text-base xl:text-xl font-semibold">
            Enter your signed up email and a link will be sent to your email account to reset the password
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex flex-col gap-y-2">

              <label htmlFor="" className="label">Email</label>

              <input 
                  type="email" 
                  className="input" 
                  placeholder='name@example'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
              />

            </div>

            {/* button */}
            <button 
              className="btn w-full "
              type="submit" 
              disabled={loading}
            >
             {loading ? 
              (
                <div className="flex items-center justify-center gap-x-2">
                  <span className="loading"/> Loading . . .
                </div>
              ) 
              : 
              ("submit")
             }
            </button>


            {error && (

              <Alert color="failure">{error}</Alert>

            )}

            {success && (

              <Alert color="success">{success}</Alert>

            )}

          </form>

        </div>

      </div>

    </div>

  )

}
