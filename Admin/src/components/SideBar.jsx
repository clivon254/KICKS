

import React, { useContext } from 'react'
import { MdHome, MdSubscriptions } from 'react-icons/md'
import { HiOutlineCollection } from "react-icons/hi";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiCoupon2Line ,RiCoupon4Fill} from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../context/store';


export default function SideBar() {

  const {open,setOpen} = useContext(StoreContext)

  const NavLinks = [
    {
        title:"Dashboard",
        path:"/",
        icon:<MdHome size={30}/>
    },
    {
        title:"products",
        path:"/products",
        icon:<HiOutlineCollection size={30}/>
    },
    {
        title:"Add-Product",
        path:"/add-product",
        icon:<HiOutlineCollection size={30}/>
    },
    {
        title:"Orders",
        path:"/orders",
        icon:<CiDeliveryTruck size={30}/>
    },
    {
        title:"Coupon",
        path:"/coupons",
        icon:<RiCoupon2Line  size={30}/>
    },
    {
        title:"Add-coupon",
        path:"/add-coupon",
        icon:<RiCoupon4Fill  size={30}/>
    },
    {
        title:"Subscribes",
        path:"/subscribe",
        icon:<MdSubscriptions size={30}/>
    }
  ]

  return (

    <aside className="p-3  h-full w-full">
        
        <nav className="flex flex-col gap-y-4">

            {NavLinks.map((nav,index) => (

               <NavLink 
                  key={index}
                  to={nav.path}
                  className={({isActive}) => isActive ? "active-link" : "link"}
                  onClick={() => setOpen(false)}
               >
                    {nav.icon} {nav.title} 
               </NavLink>

            ))}

        </nav>

    </aside>

  )

}