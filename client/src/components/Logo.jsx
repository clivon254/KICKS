

import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from "../assets/LOGO.png"

export default function Logo() {

  return (

    <div>

        <Link to="/">

            <div className="">

                {/* <img src={LOGO} 
                    alt="" 
                    className="bg-blue-100 h-20 w-20" 
                /> */}

                <span className="font-logo text-primary title2">
                    KICKS
                </span>

            </div>

        </Link>

    </div>

  )

}
