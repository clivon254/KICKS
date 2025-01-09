

import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

export default function FAQS() {

  const [openItems, setOpenItems] = useState([])

  const [items ,setItems] = useState([
    {
      question:' What are your shipping options and costs',
      answer:'We offer [list shipping methods, e.g., Standard Shipping, Express Shipping, Local Pickup]. Shipping costs vary depending on the shipping method and your location. You can view estimated shipping costs during checkout.'
    },
    {
      question:'What is your return policy',
      answer:'We offer [number]-day returns on most items. Items must be returned in their original condition with all tags and packaging. For more details, please visit our Returns Policy page.'
    },
    {
      question:'How can I track my order?',
      answer:'Yes, we offer international shipping to many countries. Shipping costs and delivery times may vary depending on your location.'
    },
    {
      question:'How do I contact customer support?',
      answer:'Answer: You can contact our customer support team by [list contact methods, e.g., email, phone, live chat]. We are available to assist you [list available hours].'
    },
    {
      question:'Do you have a size chart?',
      answer:'Yes, we have a size chart available for each shoe style. Please refer to the size chart before placing your order to ensure you get the best fit.'
    },
    {
      question:'What payment methods do you accept?',
      answer:'We accept [list accepted payment methods, e.g., credit cards, debit cards, PayPal, Apple Pay, Google Pay]. All payments are processed securely.'
    },
    {
      question:'Do you offer international shipping?',
      answer:'Yes, we offer international shipping to many countries. Shipping costs and delivery times may vary depending on your location.'
    },
  ])

  // toggle Item
  const toggleItem = (index) => {

    setOpenItems((prevOpenItems) => {

      if(prevOpenItems.includes(index))
      {
        return prevOpenItems.filter(item => item !== index)
      }
      else
      {
        return [...prevOpenItems ,index]
      }

    })

  }

  return (

    <section className="section space-y-10 ">

      <header className="md:text-4xl md:text-center text-3xl text-slate-700 font-title font-semibold">
        Questions ? We have answers
      </header>

      <div className="space-y-3 md:max-w-3xl mx-auto">

        {items.map((item ,index) => (

          <div className="py-4 w-full border p-3 cursor-pointer rounded-xl bg-slate-100  transition-all ease-in duration-500 delay-200">

            {/* question */}
            <div 
              className="flex items-start gap-x-5"
              onClick={() => toggleItem(index)}
            >

              <span className="">
                 {/* {openItems.includes(index) ? (<MdClose size={24}/>) : (<FaPlus size={24}/>)} */}
                 <FaPlus size={24}/>
              </span>

              <p className="font-semibold">{item.question}</p>

            </div>

            {/* answer */}
            {openItems.includes(index) && (

              <div className="flex items-start gap-x-5 pl-5">

                <span className="">-</span>

                <p className="text-sm text-slate-600">{item.answer}</p>

              </div>

            )}

          </div>

        ))}
      </div>

    </section>

  )
}
