

import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dropdown } from "flowbite-react"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaRegUser, FaUserAlt } from "react-icons/fa"
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import { MdChevronLeft, MdClose, MdShoppingBag } from "react-icons/md"
import { StoreContext } from '../context/store'
import { BiMenuAltLeft } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";



export default function Header() {

  const {cartNumber, open ,setOpen,Navlinks,products,getCart} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)
  
  const dispatch = useDispatch()

  const navigate = useNavigate()


  // handleSignout
  const handleSignout = () => {

    dispatch(signOutSuccess())

    localStorage.removeItem("token")

    toast.success("You have signed out")
    
    navigate('/')

    getCart()
    
  }

  const [searchOpen ,setSearchOpen] = useState(false)

  const [searchInput , setSearchInput] = useState("")

  const [filterProducts , setFilterProducts] = useState(products)

  // handleSearch
  const handleSearch = (e) => {

    const searchTerm = e.target.value

    setSearchInput(searchTerm)

    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setFilterProducts(filtered)

  }

  return (
    
    <>

      {/* Header */}
      <header className="p-5 space-y-5 border-b border-zinc-300">

        {/* upper */}
        <div className="flex items-center justify-between lg:border-b secondary pb-5">

          {/* toggle menu */}
          <div className="lg:hidden flex items-center gap-x-2 r">

            <span className="">
              {
                open ? 
                (
                  <IoClose 
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                    size={32}
                  />
                ) 
                : 
                (
                  <BiMenuAltLeft 
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                    size={32}
                  />
                )
              }
            </span>
            
            <span className="">
              <IoSearch 
                  size={30}
                  onClick={() => setSearchOpen(true)}
              />
            </span>

          </div>

          {/* logo */}
          <Logo/>

          {/* search */}
          <div className="hidden lg:block bg-blue-100 ">

              <div className="text-center relative border border-zinc-800 w-[500px]">

                <input 
                  type="text" 
                  className="border-none w-full" 
                  placeholder='what are you looking for?'
                  onChange={handleSearch}
                />

                <button className="absolute inset-y-0 right-0 p-2 bg-secondary flex items-center justify-center">
                  <IoSearch size={32}/>
                </button>

              </div>

              {searchInput && (

                <div className="absolute w-[500px] max-h-[60vh] z-50 bg-slate-100 overflow-hidden  p-3">
                  
                  {filterProducts.length > 0 ? 
                      (
                        <>

                            <div className="space-y-3">

                              {filterProducts.map((product,index) => (

                                    <div 
                                      key={index}
                                      className="flex items-center gap-x-5 border-b border-zinc-300 pb-3 cursor-pointer"
                                      onClick={() => {
                                        navigate(`/product/${product._id}`)
                                        setSearchInput("")
                                      }}
                                    >

                                      <Link to={`/product/${product._id}`}>
                                        
                                        <img 
                                          src={product?.images[0]}
                                          alt="" 
                                          className="h-16 w-16" 
                                        />

                                      </Link>

                                      <div className="flex flex-col gap-y-1">

                                          <span className="font-semibold text-base">{product?.name}</span>

                                          {product.discountPrice > 0 ? 
                                            (

                                            <div className="flex items-center gap-x-2 text-sm font-medium">

                                              <span className="text-xs line-through text-gray-500">
                                                {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                              </span>

                                              <span className="">
                                                {(product?.discountPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                              </span>

                                            </div>

                                            ) 
                                            : 
                                            (
                                              <span className="text-sm font-medium">
                                                {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                              </span>
                                            )
                                          }

                                      </div>

                                    </div>

                              ))}

                            </div>

                        </>
                      ) 
                      : 
                      (
                        <p className="">
                          Sorry <span className="">"{searchInput}"</span> not found !!!!
                        </p>
                      )
                  }

                </div>

              )}

          </div>

          {/* actions */}
          <div className="flex items-center gap-x-3">

            {currentUser ? 
              (
                <Dropdown
                  inline
                  arrowIcon={false}
                  label={
                    <Avatar
                      alt="user"
                      img={currentUser?.profilePicture}
                      rounded
                    />
                  }
                >

                  <Dropdown.Header>

                    <span className="block text-sm">{currentUser?.email}</span>

                    <span className="block text-sm">{currentUser?.username}</span>

                  </Dropdown.Header>

                  <Link to="/orders">

                    <Dropdown.Item>Order</Dropdown.Item>
                    
                  </Link>

                  <Link to="/profile">

                    <Dropdown.Item>profile</Dropdown.Item>
                    
                  </Link>

                  <Dropdown.Item
                    onClick={() => handleSignout()}
                  >
                    Sign Out
                  </Dropdown.Item>
                    

                </Dropdown>
              ) 
              : 
              (

                <div className="border border-zinc-800 p-2 rounded-full">

                  <Link to="/sign-in">

                      <FaRegUser/>

                  </Link>

                </div>

              )
            }

            {/* cart */}
            <div 
              className="relative cursor-pointer"
              onClick={() => navigate('/cart')}
            >

              <MdShoppingBag
                size={30} 
                onClick={() => navigate('/cart')}
              />

              <span className="absolute -right-3 -top-2 flex items-center justify-center h-6 w-6 bg-primary text-white rounded-full">
                {cartNumber || 0}
              </span>

            </div>

          </div>

        </div>
        
        {/* lower */}
        <div className="w-full hidden lg:flex  justify-center items-center">

          <nav className=" flex items-center gap-x-20">

            {Navlinks.map((nav,index) => (

                <NavLink 
                  key={index}
                  to={`${nav.path}`}
                  className={({isActive}) => isActive ? "active-nav-link" : "active-nav"}
                >
                  <span className="">{nav.title}</span>
                </NavLink>

            ))}

          </nav>

        </div>
        
      </header>

      {/* drawer */}
      <div className={`w-full h-full  z-50 fixed top-0  bg-black/50 backdrop-blur-sm  origin-right transition-all  duration-200 ease-in  lg:hidden ${open ? "left-0" :"left-[-100%]"}`}>

        <div className="absolute  left-0 w-[50%] md:w-[35%] h-full bg-white space-y-3 p-3 ">

                <div className="flex items-center justify-between border-b border-secondary pb-3">

                    <Logo/>

                    <span className="cursor-pointer">
                        <MdClose size={32} onClick={() => setOpen(false)} />
                    </span>

                </div>

                <div className="flex flex-col gap-y-5">

                  {Navlinks.map((nav,index) => (

                      <NavLink 
                        key={index}
                        onClick={() => setOpen(false)}
                        to={`${nav.path}`}
                        className={({isActive}) => isActive ? "active-nav-link" : "active-nav"}
                      >
                        <span className="">{nav.title}</span>
                      </NavLink>

                  ))}

                </div>

        </div>

      </div>

      {searchOpen && (

        <>

            {/* search bar */}
            <div className="w-full h-screen z-50 fixed bg-black/30 top-0 backdrop-blur-sm lg:hidden flex flex-col">

              <div className="w-full bg-gray-200 p-5 flex items-center justify-center gap-x-5">

                <span className="">
                  <MdChevronLeft 
                    size={32}
                    onClick={() => setSearchOpen(false)}
                  />
                </span>

                {/* input */}
                <div className="w-[80%] relative  border border-zinc-600 ">

                  <input 
                    type="text" 
                    className="w-full" 
                    placeholder='what do you need ? . . . .'
                    value={searchInput}
                    onChange={handleSearch}
                  />
                  
                  <button className="absolute right-0 inset-y-0 grid place-content-center bg-secondary p-2">

                    <IoSearch
                      size={24}
                      className=""
                    />

                  </button>

                </div>

              </div>

              {searchInput && (

                <div className="w-full bg-white flex-1 p-2">

                  <div className="space-y-4">

                    {filterProducts.length > 0 ? (

                      <>

                        {filterProducts.map((product,index) => (

                          <div 
                            key={index}
                            className="flex items-center gap-x-5"
                            onClick={() => {
                              navigate(`/product/${product._id}`)
                              setSearchOpen(false)
                            }}
                          >

                            <Link to={`/product/${product._id}`}>
                              
                              <img 
                                src={product?.images[0]}
                                alt="" 
                                className="h-16 w-16" 
                              />

                            </Link>

                            <div className="flex flex-col gap-y-1">

                                <span className="">{product?.name}</span>

                                {product.discountPrice > 0 ? 
                                (

                                  <div className="flex items-center gap-x-2">

                                    <span className="text-sm line-through text-gray-500">
                                      {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                    </span>

                                    <span className="text-base">
                                      {(product?.discountPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                    </span>

                                  </div>

                                  ) 
                                  : 
                                  (
                                    <span className="">
                                      {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                    </span>
                                  )
                                }

                            </div>

                          </div>

                        ))}

                      </>

                    ) 
                    : 
                    (
                      <p className="text-center text-xl font-semibold">
                        Sorry "{searchInput}" not found  !!!
                      </p>
                    )
                    }

                  </div>

                </div>

              )}

            </div>

        </>

      )}
      

    </>

  )

}
