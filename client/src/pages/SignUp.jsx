


import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { signInUserFailure, signInUserStart, signInUserSuccess, signOutSuccess } from '../redux/user/userSlice'
import {toast} from "sonner"
import {Alert} from "flowbite-react"
import Logo from '../components/Logo'
import Divider from '../components/Divider'
import OAuth from '../components/OAuth'

export default function SignUp() {

  const {url,token,setToken} = useContext(StoreContext)

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const [formData, setFormData] = useState({})


  const dispatch = useDispatch()

  const navigate = useNavigate()

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
     
        setLoading(true)
    
      const res = await axios.post(url + "/api/auth/sign-up",formData)

      if(res.data.success)
      {
        
        setLoading(false)

        toast.success("You ave signed in successfully")

        setToken(res.data.token)

        localStorage.setItem("token", res.data.token)
        
        navigate('/sign-in')
      }

    }
    catch(error)
    {
      if(error.response)
      {
        const errorMessage = error.response.data.message 

        setError(errorMessage)

        setLoading(false)

      }
      else
      {
        setError(error.message)

        setLoading(false)
      }
    }

  }

  return (

    <div className="section flex items-center justify-center min-h-screen">

      <div className="w-full max-w-xl mx-auto space-y-5">

        {/* logo */}
        <div className="flex justify-center items-center">

          <Logo/>

        </div>

        {/* form */}
        <div className="space-y-10">

          <h1 className="title3 text-center font-title">Sign Up</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="flex flex-col gap-y-2">

              <label htmlFor="" className="label">Username</label>

              <input 
                  type="text" 
                  className="input" 
                  placeholder="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
              />

            </div>

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

             <div className="flex flex-col gap-y-2">

                <label htmlFor="" className="label">password</label>

                <input 
                  type="password"
                  className="input" 
                  placeholder='**********'
                  name="password"
                  value={formData.password}
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
              ("sign up")
             }
            </button>

            <div className="flex items-center justify-between">

              <span className="text-xs font-semibold">

                <Link to="/forgot-password">
                  forgot password?
                </Link>

              </span>

              <span className="text-xs font-semibold">

                <Link to="/sign-up">
                  Already have an account?
                </Link>

              </span>

            </div>

            {error && (

              <Alert color="failure">{error}</Alert>

            )}

          </form>

          <Divider label="or"/>

          <OAuth />

        </div>

      </div>

    </div>

  )

}
