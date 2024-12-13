

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { signInUserFailure, signInUserStart, signInUserSuccess, signOutSuccess } from '../redux/user/userSlice'
import {toast} from "sonner"
import {Alert} from "flowbite-react"

export default function SignIn() {

  const {url,token,setToken} = useContext(StoreContext)

  const {loading,error} = useSelector(state => state.user)

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
      dispatch(signInUserStart())

      const res = await axios.post(url + "/api/auth/sign-in",formData)

      if(res.data.success)
      {
        dispatch(signInUserSuccess(res.data.rest))

        toast.success("You ave signed in successfully")

        setToken(res.data.token)

        localStorage.setItem("token", res.data.token)
        
        navigate('/')
      }

    }
    catch(error)
    {
      if(error.response)
      {
        const errorMessage = error.response.data.message 

        dispatch(signInUserFailure(errorMessage))

      }
      else
      {
        dispatch(signInUserFailure(error.message))
      }
    }

  }

  return (

    <div className="section flex items-center justify-center min-h-screen">

      <div className="w-full max-w-xl mx-auto">

        {/* logo */}
        <div className=""></div>

        {/* form */}
        <div className="space-y-10">

          <h1 className="title3 text-center">Sign in </h1>

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
              ("sign in")
             }
            </button>

            <div className="">

              <span className="">

                <Link to="/forgot-password">
                  forgot password?
                </Link>

              </span>

            </div>

            {error && (

              <Alert color="failure">{error}</Alert>

            )}

          </form>

        </div>

      </div>

    </div>

  )

}
