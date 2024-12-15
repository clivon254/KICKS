

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { Table } from 'flowbite-react'
import { FaEdit, FaStreetView, FaTrashAlt } from "react-icons/fa"
import { MdViewComfyAlt, MdViewStream } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {HiExclamationCircle} from "react-icons/hi"
import axios from 'axios'
import { toast } from 'sonner'



export default function Products() {

  const {url ,token ,products ,setProducts , productLoading ,productError} = useContext(StoreContext)

  const [open ,setOpen] = useState(false)

  const [productIdToDelete ,setProductIdToDelete] = useState(null)

 
  // handleDelete
  const handleDelete = async () => {

    try
    {
      const res = await axios.delete(url + `/api/product/delete-product/${productIdToDelete}`,{headers:{token}})
      
      if(res.data.success)
      {
        setProducts((prev) => 
        prev.filter((product) => product._id !== productIdToDelete))

        setOpen(false)

        toast.error("product deleted successfully")
      }

    }
    catch(error)
    {
      console.error(error)
    }

  }
 
  return (

    <>

      {productLoading && !productError && (

        <div className=""></div>

      )}

      {!productLoading && !productError && (

        <section className="section space-y-10">

          <h1 className="title2 text-center">Products</h1>

          <div className="tabler">

            <Table>

              <Table.Body className="table-title">

                <Table.Row>

                  <Table.Cell></Table.Cell>

                  <Table.Cell>Image</Table.Cell>

                  <Table.Cell>Name</Table.Cell>

                  <Table.Cell>Instock</Table.Cell>

                  <Table.Cell>Category</Table.Cell>

                  <Table.Cell>Brand</Table.Cell>

                  <Table.Cell>Actions</Table.Cell>

                </Table.Row>

              </Table.Body>

              {products?.length > 0 ? 
                (
                  <>
                    {products.map((product,index) => (

                      <Table.Body>

                        <Table.Row>

                          <Table.Cell>{index + 1}.</Table.Cell>

                          <Table.Cell>

                            <img 
                              src={product?.images[0]}
                              alt="" 
                              className="h-12 w-12 " 
                            />

                          </Table.Cell>

                          <Table.Cell>
                            {product?.name}
                          </Table.Cell>

                          <Table.Cell>
                            {product?.instock}
                          </Table.Cell>

                          <Table.Cell>
                            {product?.category}
                          </Table.Cell>

                          <Table.Cell>
                            {product?.brand}
                          </Table.Cell>

                          <Table.Cell>

                            <div className="flex items-center gap-x-2">

                              <span className="">

                                <Link to={`/product/${product._id}`}>

                                  <MdViewComfyAlt size={20}/>

                                </Link>

                              </span>

                              <span className="">

                                <Link to={`/update-product/${product._id}`}>

                                  <FaEdit size={20}/>

                                </Link>

                              </span>

                              <span className="">

                                <FaTrashAlt 
                                  size={20}
                                  onClick={() => {

                                    setProductIdToDelete(product._id)

                                    setOpen(true)

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
                  <p className=""></p>
                )
              }

            </Table>

          </div>

        </section>

      )}

      {productError && (

        <div className=""></div>

      )}

      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md  bg-white transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={44} className="mx-auto"/>

                <h2 className="text-center">Are you sure you want to delete this Product ?</h2>

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
