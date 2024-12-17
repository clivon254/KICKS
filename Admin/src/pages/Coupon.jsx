

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Table } from 'flowbite-react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HiExclamationCircle } from "react-icons/hi"
import axios from "axios"



export default function Coupon() {

  const {url,token,coupons,setCoupons,couponLoading,couponError,fetchCoupons} = useContext(StoreContext)

  const [open ,setOpen] = useState(false)

  const [couponIdToDelete ,setCouponIdToDelete] = useState(null)

  // handlDelete
  const handleDelete = async() => {

    try
    {
      const response = await axios.delete(url + `/api/coupon/delete-coupon/${couponIdToDelete}`,{headers:{token}})

      if(response.data.success)
      {

        setCoupons((prev) => (

          prev.filter((coupon) => coupon._id === couponIdToDelete)
        ))

        setOpen(false)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  return (

    <>

      {!couponLoading && !couponError && (

        <section className="section">

            <h1 className="text-center title2">Coupons</h1>

            <div className="tabler">

              <Table>

                <Table.Body className="table-title">

                  <Table.Row>

                    <Table.Cell>code</Table.Cell>

                    <Table.Cell>discount</Table.Cell>

                    <Table.Cell>Maxuses</Table.Cell>

                    <Table.Cell>uses</Table.Cell>

                    <Table.Cell>expiryDate</Table.Cell>

                    <Table.Cell>Actions</Table.Cell>

                  </Table.Row>

                </Table.Body>

                  {coupons.length > 0 ? 
                    (
                      <>
                          {coupons.map((coupon,index) => (

                            <Table.Body key={index}>
 
                                <Table.Row>

                                  <Table.Cell>{coupon.code}</Table.Cell>

                                  <Table.Cell>{coupon.discount}%</Table.Cell>

                                  <Table.Cell>{coupon.maxUses}</Table.Cell>

                                  <Table.Cell>{coupon.numUses}</Table.Cell>

                                  <Table.Cell>{new Date(coupon.expiryDate).toLocaleDateString()}</Table.Cell>

                                  <Table.Cell>

                                    <div className="flex items-center gap-x-2">

                                      <span className="">

                                        <Link to={`/update-coupon/${coupon._id}`}>

                                          <FaEdit size={24}/>

                                        </Link>

                                      </span>

                                      <span className="">

                                        <FaTrashAlt 
                                          size={24} 
                                          className="text-red-600"
                                          onClick={() => {

                                            setOpen(true)

                                            setCouponIdToDelete(coupon._id)
                                          }}
                                        />

                                      </span>

                                    </div>

                                  </Table.Cell>
                                  
                                </Table.Row>

                            </Table.Body>

                          ))}
                      </>
                    ) 
                    : 
                    (
                      <p className="text-center">There are no coupons yet !!!</p>
                    )
                  }

                

              </Table>

            </div>

        </section>

      )}

      {couponLoading && !couponError && (

        <Loading/>
      )}

      {couponError && (

        <Error retry={fetchCoupons}/>

      )}

      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md  bg-white transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={44} className="mx-auto"/>

                <h2 className="text-center">Are you sure you want to delete this coupon? </h2>

                <div className="flex justify-between items-center">

                  <button 
                    className="btn rounded-md"
                    onClick={() => handleDelete()}
                  >
                    Yes I'm sure
                  </button>

                  <button 
                    className="btn2 rounded"
                    onClick={() => setOpen(false)}
                  >
                    cancel
                  </button>

                </div>

            </div>

        </div>

      )}

    </>

  )

}
