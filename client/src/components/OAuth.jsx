

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { signInUserSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import { FcGoogle } from "react-icons/fc"


export default function OAuth() {

    const {url,token,setToken,fetchCart} = useContext(StoreContext)

    const auth = getAuth(app)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // handleGoogleClick
    const handleGoogleClick = async () => {

        try
        {
            const provider = new GoogleAuthProvider()

            provider.setCustomParameters({prompt:'select_account'})

            const resultsFromGoogle = await signInWithPopup(auth ,provider)

            let data = {
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL
            }

            const res = await axios.post(url + "/api/auth/google" ,data)

            if(res.data.success)
            {
                dispatch(signInUserSuccess(res.data.rest))

                localStorage.setItem("token" ,res.data.rest.token)

                navigate('/')

                toast.success("You have signed in successfully")

                fetchCart()
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

  return (

    <button 
        className="flex items-center justify-center flex-row-reverse w-full gap-x-5 border border-zinc-400 rounded-md font-semibold font-title text-base p-3"
        onClick={handleGoogleClick}
    >
        Sign in with Google <FcGoogle/>
    </button>

  )

 }
