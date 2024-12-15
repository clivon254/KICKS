

import React from 'react'

export default function Error({retry}) {

  return (

    <div className="section max-w-md mx-auto flex flex-col gap-y-3 items-center justify-center min-h-[60vh]">

        <h1 className="text-center text-base font-semibold ">connection failed !</h1>

        <p className="text-center text-sm font-medium">Check your connection to the internet and try again</p>

        <button 
            className="border border-black px-10 py-2 rounded-full font-medium"
            onClick={() => retry()}
        >
            retry
        </button>

    </div>

  )

}
