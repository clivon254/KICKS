

import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'sonner'
import ProductPage from './pages/ProductPage'
import CheckOut from './pages/CheckOut'
import Cart from './pages/Cart'
import ConfirmPayment from './pages/ConfirmPayment'
import Orders from './pages/Orders'
import SignUp from './pages/SignUp'

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

        <Toaster richColors/>

        <Routes>

          <Route element={<Layout/>}>

            <Route path="/" element={<Home/>} />

            <Route path="/product/:productId" element={<ProductPage/>} />

            <Route path="/cart" element={<Cart/>} />

            <Route path="/checkout" element={<CheckOut/>} />

            <Route path="/orders" element={<Orders/>} />

            <Route path="/confirm-payment/:CheckoutRequestID/:orderId" element={<ConfirmPayment/>}/>
          
          </Route>

          <Route path="/sign-in" element={<SignIn/>} />

          <Route path="/sign-up" element={<SignUp/>} />

          <Route path="/forgot-password" element={<ForgotPassword/>} />

          <Route path="/reset-password/:token" element={<ResetPassword/>} />

        </Routes>

      </main>

   </BrowserRouter>

  )
}
