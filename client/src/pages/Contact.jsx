

import React from 'react'
import { FaAt, FaHeadphonesAlt } from "react-icons/fa"

export default function Contact() {

  return (

   <section className="section">

    <div className="w-full flex flex-col gap-10 md:flex-row p-2 items-center">

      {/* descriptions */}
      <div className="space-y-6 w-full md:w-1/2">

        <div className="space-y-2">

          <h3 className="text-2xl font-semibold text-primary font-title">Contact us</h3>

          <h4 className="text-5xl font-semibold font-title">Get in touch today</h4>

          <p className="text-slate-500 text-xl">We like to interact with our customers , and there what they think our products and feedback</p>

        </div>

        {/* email */}
        <div className="flex items-start gap-x-10 p-4 border rounded-xl shadow-md hover:border-primary">

          <span className="bg-primary h-20 w-20 flex items-center justify-center rounded-xl">
            <FaAt size={40} className="text-white "/>
          </span>

          <span className="flex flex-col gap-y-4">

            <span className="text-xl font-semibold text-slate-600">Email:</span>

            <span className="text-primary text-base">kicks@gmail.com</span>

          </span>

        </div>

        {/*phone  */}
        <div className="flex items-start gap-x-10 p-4 border rounded-xl shadow-md hover:border-primary">

          <span className="bg-primary h-20 w-20 flex items-center justify-center rounded-xl">
            <FaHeadphonesAlt size={40} className="text-white "/>
          </span>

          <span className="flex flex-col gap-y-4">

            <span className="text-xl font-semibold text-slate-600">Phone:</span>

            <span className="text-primary text-base">+254 57 429 010</span>

          </span>

        </div>

      </div>

      {/* form */}
      <div className="w-full md:w-1/2">

        <form action="" className="space-y-3 border px-4 py-6 rounded-xl shadow-sm shadow-primary">
          
          {/* name */}
          <div className="flex flex-col gap-y-1">

            <label htmlFor="" className="label">Name</label>

            <input 
              type="text" 
              className="input" 
              placeholder="Enter your name"
            />

          </div>

          {/* email Address */}
          <div className="flex flex-col gap-y-1">

            <label htmlFor="" className="label">email</label>

            <input 
              type="email" 
              className="input" 
              placeholder="name@exmaple.com"
            />

          </div>

          {/* message */}
          <div className="flex flex-col gap-y-1">

            <label htmlFor="" className="label">Message</label>

            <textarea
              type="email" 
              className="input" 
              placeholder="Enter your message"
            />

          </div>

          <button className="w-full btn rounded-md">
            Send Message
          </button>

        </form>

      </div>

    </div>

   </section>

  )

}
