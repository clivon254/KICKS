
import { useContext, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import {Toaster} from "sonner"
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { useSelector } from 'react-redux'
import { StoreContext } from './context/store'
import Header from './components/Header'
import SideBar from './components/SideBar'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import Orders from './pages/Orders'
import AddCoupon from './pages/AddCoupon'
import Profile from './pages/Profile'
import Subscribers from './pages/Subscribers'
import UpdateProduct from './pages/UpdateProduct'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import ConfirmPayment from './pages/ConfirmPayment'
import Coupon from './pages/Coupon'
import UpdateCoupon from './pages/UpdateCoupon'

function App() {
 
  const Layout = () => {

    const {currentUser} = useSelector(state => state.user)

    const {token} = useContext(StoreContext)

    return (

      currentUser && currentUser?.isAdmin ?

        <div className="w-full h-screen flex flex-col ">

          <div className="sticky top-0">

            <Header/>

          </div>

          <div className="flex-1 overflow-auto flex ">

            {/* sidebar */}
            <div className="hidden lg:block w-full lg:w-1/4 h-full border-r ">

              <SideBar/>

            </div>

            <div className="w-full lg:w-3/4">

              <Outlet/>

            </div>

          </div>

        </div>
        :
        <Navigate to="/sign-in" />

    )

  }

  return (
   
    <BrowserRouter>
    
      <Toaster richColors/>

      <main className="w-full">

        <Routes>

          <Route element={<Layout/>}>

            <Route path="/" element={<Dashboard/>}/>

            <Route path="/product/:productId" element={<ProductPage/>}/>

            <Route path="/update-product/:productId" element={<UpdateProduct/>}/>

            <Route path="/add-product" element={<AddProduct/>}/>

            <Route path="/products" element={<Products/>}/>

            <Route path="/orders" element={<Orders/>}/>

            <Route path="/add-coupon" element={<AddCoupon/>}/>

            <Route path="/update-coupon/:couponId" element={<UpdateCoupon/>}/>

            <Route path="/coupons" element={<Coupon/>}/>

            <Route path="/profile" element={<Profile/>}/>

            <Route path="/cart" element={<Cart/>}/>

            <Route path="/checkout" element={<CheckOut/>}/>

            <Route path="/confirm-payment/:CheckoutRequestID/:orderId" element={<ConfirmPayment/>}/>

            <Route path="/subscribe" element={<Subscribers/>}/>

          </Route>

          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="/sign-up" element={<SignUp/>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>

          <Route path="/reset-password/:token" element={<ResetPassword/>}/>

        </Routes>

      </main>

    </BrowserRouter>

  )
}

export default App
