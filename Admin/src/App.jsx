
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

function App() {
 
  const Layout = () => {

    const {currentUser} = useSelector(state => state.user)

    const {token} = useContext(StoreContext)

    return (

      currentUser?.isAdmin ?

        <div className="w-full min-h-screen">

          <div className="">

            <Header/>
            
          </div>

          <div className="">

            <Outlet/>

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
