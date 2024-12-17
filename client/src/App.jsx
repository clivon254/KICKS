

import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {

  // layout
  const Layout = () => {

    return(

      <div className="min-h-screen flex flex-col">
        
        <Header/>

        <div className="flex-1">

          <Outlet/>

        </div>

        <Footer/>


      </div>

    )

  }


  return (

   <BrowserRouter>

      <main className="min-h-screen">

        <Routes>

          <Route element={<Layout/>}>

            <Route path="/" element={<Home/>} />
          
          </Route>

          <Route path="/sign-in" element={<SignIn/>} />

          <Route path="/sign-up" element={<SignIn/>} />

          <Route path="/forgot-password" element={<ForgotPassword/>} />

          <Route path="/reset-password/:token" element={<ResetPassword/>} />

        </Routes>

      </main>

   </BrowserRouter>

  )
}
