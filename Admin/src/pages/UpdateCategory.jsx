


import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'
import Loading from '../components/Loading'
import Error from '../components/Error'


export default function UpdateCategory() {

  const {url,token,fetchCategorys} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const navigate = useNavigate()

  const [fetchLoading ,setFetchLoading] = useState(false)

  const [fetchError ,setFetchError] = useState(false)

  const {categoryId} = useParams()

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

      const res = await axios.put(url + `/api/category/update-category/${categoryId}`,formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        navigate('/category')

        toast.success(`${formData.name} is added successfully`)

        fetchCategorys()
        
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

  // fetchCategory
  const fetchCategory = async () => {

    try
    {
      setFetchLoading(true)

      setFetchError(false)

      const res = await axios.get(url + `/api/category/get-category/${categoryId}`)

      if(res.data.success)
      {
        setFetchLoading(false)

        setFormData(res.data.category)
      }

    }
    catch(error)
    {
      setFetchError(true)

      setFetchLoading(false)
    }

  }

  useEffect(() => {

    fetchCategory()

  },[categoryId]);


  console.log(formData)

  return (

    <>
      
      {!fetchLoading && !fetchError && (

        <section className="section space-y-10 max-w-xl mx-auto">

          <h2 className="title2 text-center">Update Size</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* name */}
            <div className="flex flex-col gap-y-2">

              <label className="label">Name</label>

              <input 
                type="text" 
                className="input" 
                placeholder='name of the size'
                name="name"
                onChange={handleChange}
                value={formData.name}
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
