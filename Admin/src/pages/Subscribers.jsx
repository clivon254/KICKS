

import React, { useContext, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../context/store'
import { toast } from 'sonner'


export default function Subscribers() {
  
  const {url,token} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [Loading ,setLoading] = useState(false)

  const [error ,seterror] = useState(false)

  const [subscribers ,setSubscribers] = useState(false)

  console.log(formData)

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSendMessage 
  const handleSendMessage = async (e) => {

    e.preventDefault()

    try
    {
      setLoading(true)

      const res = await axios.post(url + "/api/subscribe/send-message",formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success('message sent successfully')
      }

    }
    catch(error)
    {
      console.log(error.message)

      setLoading(false)

      seterror(true)
    }

  }

  // fetchSubcribers
  const fetchSubcribers = async () => {

    try
    {
      const res = await axios.get(url + "")

      if(res.data.success)
      {}

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


 return (

   <section className="section space-y-4 max-w-lg mx-auto">

      <h1 className="title3 text-center">Send a message your subscribers</h1>

      <p className=""></p>

      <form onSubmit={handleSendMessage} className="space-y-5">

        {/* subject */}
        <div className="flex flex-col gap-y-2">

          <label htmlFor="" className="label">Subject</label>

          <input 
            type='text'
            className="input"
            onChange={handleChange}
            value={formData.subject}
            placeholder='subject'
            name="subject"
          />

        </div>

        {/* message */}
        <div className="flex flex-col gap-y-2">

          <label htmlFor="" className="label">message</label>

          <textarea 
            className="input"
            onChange={handleChange}
            value={formData.message}
            name="message"
            placeholder='type here . . . . .'
          />

        </div>

        <button 
          className="btn w-full"
          type="submit"
          disabled={Loading}
        >
          {Loading ? 
            (
              <div className="flex items-center justify-center  gap-x-3">

                <span className="loading"/> loading

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
