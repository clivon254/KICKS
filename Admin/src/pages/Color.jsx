
import React, { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { Table } from 'flowbite-react'
import { FaEdit, FaStreetView, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { HiExclamationCircle } from 'react-icons/hi'
import axios from 'axios'

export default function Color() {

  const {colors,colorLoading,colorError,url,token,setColors} = useContext(StoreContext)

  const [open ,setOpen] = useState()

  const [colorIdToDelete ,setColorIdToDelete] = useState(null)

  // handleDelete
  const handleDelete = async () => {

    try
    {
      const res = await axios.delete(url + `/api/color/delete-color/${colorIdToDelete}`,{headers:{token}})

      if(res.data.success)
      {
        setColors(
          (prev) => prev.filter(color => color._id !== colorIdToDelete)
        )

        setOpen(false)

      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  console.log(colors)

  return (

    <>

      {!colorLoading && !colorError && (

        <section className="section space-y-10">

          <h2 className="title2 text-center ">colors</h2>

          <div className="tabler">

            <Table>

              <Table.Body className="table-title">

                <Table.Row>

                  <Table.Cell></Table.Cell>

                  <Table.Cell>name</Table.Cell>

                  <Table.Cell>color</Table.Cell>

                  <Table.Cell>Actions</Table.Cell>

                </Table.Row>

              </Table.Body>

              {colors.length > 0 ? 
                (
                  <>
                    {colors.map((color,index) => (

                      <Table.Body>

                        <Table.Cell>{index+1}.</Table.Cell>

                        <Table.Cell>{color.name}</Table.Cell>

                        <Table.Cell>

                          <div 
                            className={` h-6 w-6 rounded-full`}
                            style={{backgroundColor: color.hex}}
                          />
                          
                        </Table.Cell>

                        <Table.Cell>

                          <div className="flex items-center gap-x-2 cursor-pointer">

                            <span className="">
                              <Link to={`/update-color/${color._id}`}>
                                <FaEdit size={20}/>
                              </Link>
                            </span>

                            <span className="">
                              <FaTrashAlt 
                                  size={20}
                                  onClick={() => {
                                    setColorIdToDelete(color._id)
                                    setOpen(true)
                                  }} 
                              />
                            </span>

                          </div>

                        </Table.Cell>

                      </Table.Body>

                    ))}
                  </>
                ) 
                : 
                (
                  <p className="text-center text-xl">There are no colors yet</p>
                )
              }

            </Table>

          </div>

        </section>

      )}

      {colorLoading && !colorError && (

        <Loading/>

      )}

      {colorError && (

        <Error/>

      )}
      

      {open && (
      
        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md  bg-white transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={44} className="mx-auto"/>

                <h2 className="text-center">Are you sure you want to delete this color ?</h2>

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
