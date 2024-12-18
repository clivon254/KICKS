import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

export default function Footer() {
    
  return (

    <footer className="w-full  p-5 bg-secondary text-sm">

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-5">

            {/* contact us */}
            <div className="space-y-2">

                <Logo/>

                <div className="space-y-1 ">

                    <p className="text-sm">
                        <span className="text-base font-medium">Address :</span> Nairobi,Kenya
                    </p>

                    <p className="">
                        <span className="text-base font-medium"> Contact :</span> +254111202895
                    </p>

                    <p className="">
                        <span className="text-base font-medium">Email Address :</span> kicks4@gmail.com
                    </p>

                    <p className="">
                        <span className="text-base font-medium">working Hours : </span> 09:00 - 18:00, Mon - sat
                    </p>

                </div>

            </div>

            {/* usefull links */}
            <div className="space-y-2">

                <h3 className="font-bold font-title  ">Useful Links</h3>

                <div className="flex flex-col gap-y-1">
                    
                    <span className="">
                        <Link to="/contact-us">Contact us</Link>
                    </span>

                    <span className="">
                        <Link to="/about-us">About us</Link>
                    </span>

                    <span className="">
                        <Link to="/terms">Terms & Condition</Link>
                    </span>

                    <span className="">
                        <Link to="/faqs">FAQS</Link>
                    </span>

                </div>

            </div>

            {/* legal */}
            <div className="flex flex-col gap-y-1">

                <span className="">
                    <Link to="/">Return & Exchange</Link>
                </span>

                <span className="">
                    <Link to="/">Shipping & delivery</Link>
                </span>

                <span className="">
                    <Link to="/">Privacy Policy</Link>
                </span>

            </div>

            {/* news letter */}
            <div className="w-full space-y-3 lg:col-span-2">

                <h3 className="text-base font-semibold">Join Our Newsletter Now</h3>

                <p className="te">Get Email update about our latest shop and special offers</p>

                <div className="w-full flex h-12">

                    <input 
                        type="text" 
                        className="flex-1 h-full bg-transparent rounded-l"
                        placeholder='Enter your email' 
                    />

                    <button 
                        className="bg-primary h-full text-white rounded-r px-3 text-base font-semibold outline-0"
                    >
                        Subscribe
                    </button>

                </div>

            </div>

        </div>

    </footer>

  )

}
