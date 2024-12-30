

import React, { useContext } from 'react'
import LOGO from "../assets/LOGO.png"
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dropdown } from "flowbite-react"
import { MdClose, MdLogout, MdMenu, MdShoppingBag, MdShoppingCart } from "react-icons/md"
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'

export default function Header() {

    const {open,setOpen,cartNumber} = useContext(StoreContext)

    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleSignout
    const handleSignout = () => {

        try
        {
            dispatch(signOutSuccess())

            localStorage.removeItem("token")

            toast.success("you have signed out successfully")
        }
        catch(error)
        {
            console.log(error.message)
        }
    }

  return (

    <>

        <header className="p-2 shadow-sm">

            <div className="flex items-center justify-between">

                {/* toggle */}
                <div className="lg:hidden cursor-pointer">
                    {open ? 
                    (
                        <MdClose size={32} onClick={() => setOpen(false)}/>
                    ) 
                    : 
                    (
                        <MdMenu size={32} onClick={() => setOpen(true)}/>
                    )
                }
                </div>

                {/* logo  */}
                <div className="">
                    
                    <div className="h-12 w-12 md:h-20 md:w-20 ">

                        <img 
                            src={LOGO} 
                            alt="" 
                            className="w-full h-full " 
                        />

                    </div>

                </div>
                

                {/* actions */}
                <div className="flex items-center gap-x-3">

                    <div className="relative">

                        <MdShoppingBag 
                            size={30} 
                            onClick={() => navigate('/cart')}
                        />
                        
                        <span className="absolute -right-3 -top-2 flex items-center justify-center h-6 w-6 bg-blue-800 text-white rounded-full">
                            {cartNumber}
                        </span>

                    </div>

                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={
                            <Avatar
                                rounded
                                img={currentUser?.profilePicture}
                            />
                        }
                    >
                        <Dropdown.Header>
                            
                            <span className="block">{currentUser.email}</span>

                            <span className="block">{currentUser.username}</span>

                        </Dropdown.Header>
                        
                        <Link to="/profile">

                            <Dropdown.Item>Profile</Dropdown.Item>
                            
                        </Link>

                        <Dropdown.Item 
                            className="flex items-center gap-x-2"
                            onClick={() => handleSignout()}
                        >
                            sign out <MdLogout/>
                        </Dropdown.Item>
                        

                    </Dropdown>

                </div>

            </div>

        </header>

        {/* drawer */}
        <div 
          className={`w-full h-full  fixed top-0  bg-black/50 backdrop-blur-sm  origin-right transition-all  duration-200 ease-in lg:hidden overflow-y-hidden  ${open ? "left-0" :"left-[-100%]"}`}
        >

            <div className="absolute  left-0 w-[70%] h-full bg-white space-y-6 overflow-y-scroll">

                <div className="flex justify-start p-2">

                    <span className="">
                        <MdClose size={32} onClick={() => setOpen(false)} />
                    </span>

                </div>

                <SideBar />

            </div>

        </div>
        
    </>

  )

}
