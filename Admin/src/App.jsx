
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
import AddCategory from './pages/AddCategory'
import Category from './pages/Category'
import UpdateCategory from './pages/UpdateCategory'
import AddBrand from './pages/AddBrand'
import UpdateBrand from './pages/UpdateBrand'
import Brand from './pages/Brand'
import AddSize from './pages/AddSize'
import UpdateSize from './pages/UpdateSize'
import Size from './pages/Size'
import AddColor from './pages/AddColor'
import UpdateColor from './pages/UpdateColor'
import Color from './pages/Color'

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

            <Route path="/add-category" element={<AddCategory/>}/>

            <Route path="/update-category/:categoryId" element={<UpdateCategory/>}/>

            <Route path="/category" element={<Category/>}/>

            <Route path="/add-brand" element={<AddBrand/>}/>

            <Route path="/update-brand/:brandId" element={<UpdateBrand/>}/>

            <Route path="/brand" element={<Brand/>}/>

            <Route path="/add-size" element={<AddSize/>}/>

            <Route path="/update-size/:sizeId" element={<UpdateSize/>}/>

            <Route path="/size" element={<Size/>}/>

            <Route path="/add-color" element={<AddColor/>}/>

            <Route path="/update-color/:colorId" element={<UpdateColor/>}/>

            <Route path="/color" element={<Color/>}/>

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
