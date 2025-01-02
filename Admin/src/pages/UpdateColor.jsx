import axios from 'axios'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function UpdateColor() {

  const {url,token,fetchColors} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const navigate = useNavigate()

  const [fetchLoading ,setFetchLoading] = useState(false)

  const [fetchError ,setFetchError] = useState(false)

  const {colorId} = useParams()


  // fetchColor
  const fetchColor = async () => {

    try
    {
      setFetchLoading(true)

      setFetchError(false)

      const res = await axios.get(url + `/api/color/get-color/${colorId}`)

      if(res.data.success)
      {
        setFetchLoading(false)

        setFormData(res.data.color)
      }

    }
    catch(error)
    {
      setFetchError(true)

      setFetchLoading(false)
    }

  }

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

      const res = await axios.put(url + `/api/color/update-color/${colorId}`,formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        navigate('/color')

        toast.success(`${formData.name} is updated successfully`)

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

  useEffect(() => {

    fetchColor()

  },[colorId])

  return (

    <>

    {!fetchLoading && !fetchError && (
    
      <section className="section space-y-10 max-w-xl mx-auto">

        <h2 className="title2 text-center">Update Color</h2>

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
              type="text" 
              className="input" 
              placeholder='hex code'
              name="hex"
              onChange={handleChange}
              value={formData.hex}
            />

          </div>

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

    )}

    {fetchLoading && !fetchError && (

      <Loading/>

    )}

    {fetchError && (

      <Error/>
      
    )}

    </>
  )
}
