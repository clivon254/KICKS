import axios from 'axios'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'

export default function AddColor() {

  const {url,token,fetchColors} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const navigate = useNavigate()

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData ,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError(null)

    try
    {

      const res = await axios.post(url + "/api/color/create-color",formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        navigate('/color')

        toast.success(`${formData.name} is added successfully`)

        fetchColors()
        
      }

    }
    catch(error)
    {

      setLoading(false)

      if(error.response)
      {
        const errorMessage = error.response.data.message

        setError(errorMessage)

      }
      else
      {
        setError(error.message)
      }

    }

  }

  console.log(formData)

  return (
    
    <section className="section space-y-10 max-w-xl mx-auto">

      <h2 className="title2 text-center">Add Color</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* name */}
        <div className="flex flex-col gap-y-2">

          <label className="label">name</label>

          <input 
            type="text" 
            className="input" 
            placeholder='name of the color'
            name="name"
            onChange={handleChange}
            value={formData.name}
          />

        </div>

        {/* hex */}
        <div className="flex flex-col gap-y-2">

          <label className="label">hex</label>

          <input 
            type="color" 
            className="w-full input cursor-pointer" 
            // placeholder='hex code'
            name="hex"
            onChange={handleChange}
            value={formData.hex}
          />

        </div>

        <div 
          className="h-10 w-full border border-zinc-300 rounded-md"
          style={{ backgroundColor: formData?.hex }}
        />

        {/* button */}
        <button 
          className="btn w-full rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 
          (
            <div className="flex items-center justify-center gap-x-4">

              <span className="loading"/> Loading

            </div>
          ) 
            : 
          ("submit") }
        </button>

        {/* error */}
        {error && (

          <Alert color="failure">{error}</Alert>

        )}

      </form>

    </section>

  )
}
