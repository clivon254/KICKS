

import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from "../assets/LOGO.png"

export default function Logo() {

  return (

    <div>

        <Link to="/">

            <div className="">

                <span className="font-logo text-primary title2">
                    KICKS
                </span>

            </div>

        </Link>

    </div>

  )

}
