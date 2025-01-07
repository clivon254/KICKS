

import React, { Fragment, useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react"
import clsx from "clsx"
import {BsCheck, BsChevronExpand} from "react-icons/bs"
import { Alert } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Error from '../components/Error'
import Loading from '../components/Loading'


export default function UpdateProduct() {

  const {url ,token,sizes,colors,categorys,brands} = useContext(StoreContext)

  const [files ,setFiles] = useState([])

  const [uploading ,setUploading] = useState(false)

  const [imageUploadProgress, setImageUploadProgress] = useState(null)

  const [imageUploadError ,setImageUploadError] = useState(null)

  const [error ,setError] = useState(null)

  const [loading ,setLoading] = useState(false)

  const [formData ,setFormData] = useState({
    images:[],
    discountPrice:0
  })


  const [selectedSizes ,setSelectedSizes] = useState([])


  const [selectedColors ,setSelectedColors] = useState([])
  
  const navigate = useNavigate()

  const {productId} = useParams()

  const [productLoading , setProductLoading] = useState(false)

  const [productError , setProductError] = useState(false)
  

  // handleImageSubmit
  const handleImageSubmit = (e) => {

    if(files.length > 0 && files.length + formData.images.length < 7)
    {
      setUploading(true)

      setImageUploadError(null)

      const promise = []

      for(let i = 0 ; i < files.length ; i++)
      {
        promise.push(storageImage(files[i]))
      }

      Promise.all(promise)
      .then((urls) => {

        setFormData({
          ...formData,
          images:formData.images.concat(urls)
        })

        setImageUploadError(null)

        setUploading(false)

      }).catch((error) => {

        setImageUploadError('Image upload failed')

        setUploading(false)
      })

    }
    else
    {
      setImageUploadError("You only upload up to 6images")

      setUploading(false)
    }

  }

  // storeImage
  const storageImage = async (file) => {

    return new Promise((resolve,reject) => {

      const storage = getStorage(app)

      const fileName = new Date().getTime() + file.name 

      const storageRef = ref(storage ,fileName)

      const uploadTask = uploadBytesResumable(storageRef , file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100

          setImageUploadProgress(progress.toFixed(0))

        },
        (error) => {

          error(reject)

        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((dowloadURL) => {

            resolve(dowloadURL)

          })

        },
      )
    })

  }

  // handleRemoveImage
  const handleRemoveImage = (index) => {

    setFormData({
      ...formData,
      images:formData?.images?.filter((_,i) => i !== index)
    })

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault(e)

    if(formData?.images?.length < 0)
    {
      setError("Select atleast one image")

      return
    }

    setError(null)

    setLoading(true)

    try
    {
      const res = await axios.put(url + `/api/product/update-product/${productId}`,formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success(`${formData.name} is updated `)

        navigate('/products')

        setFormData({})

      }

    }
    catch(error)
    {
      if(error.response)
      {
        setError(error.response.data.message)

        setLoading(false)
      }
      else
      {
        console.log(error)

        setLoading(false)
      }

    }

  }

  // handleChangeSelectedSize
  const handleChangeSelectedSize = (el) => {

    setSelectedSizes(el)

    setFormData({...formData ,sizes : el})

  }

  // handleChangeSelectedColor
  const handleChangeSelectedColor = (el) => {

    setSelectedColors(el)

    setFormData({...formData , colors : el})

  }

  // fetch product
  const fetchProduct = async () => {

    try
    {
        setProductError(false)

        setProductLoading(true)

        const res = await axios.get(url + `/api/product/get-product/${productId}`)

        if(res.data.success)
        {
            setFormData(res.data.product)

            setProductLoading(false)
        }

    }
    catch(error)
    {
        console.log(error.message)

        setProductLoading(false)

        setProductError(true)
    }

  }

  useEffect(() => {

    if(formData?.colors?.length < 1)
    {
      colors && setSelectedColors([colors[0]])
    }
    else
    {
      setSelectedColors(formData?.colors)
    }


    if(formData?.sizes?.length < 1)
    {
      sizes && setSelectedSizes([sizes[0]])
    }
    else
    {
      setSelectedSizes(formData?.sizes)
    }


    fetchProduct()


  },[productId])


  console.log(formData)

  return (

    <>

        {!productError && !productLoading &&(

            <section className="section space-y-4 max-w-lg mx-auto">

            <h1 className="text-center title2">Update Product</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 ">

                {/* title */}
                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">Name</label>

                    <input 
                        type="text" 
                        className="input"
                        placeholder='name' 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData , name : e.target.value})}
                    />

                </div>

                {/* category */}
                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">Category</label>

                    <select 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData , category:e.target.value})}
                      className="input"
                    >

                      <option value="">Select Category</option>

                      {categorys.map((category,index) => (

                        <option key={index} value={category.name}>{category.name}</option>

                      ))}

                    </select>

                </div>

                {/* brand */}
                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">Brand</label>

                    <select 
                    value={formData.brand} 
                    onChange={(e) => setFormData({...formData , brand:e.target.value})}
                    className="input"
                    >
                      <option value="">Select Brand</option>

                      {brands.map((brand,index) => (

                        <option key={index} value={brand.name}>{brand.name}</option>

                      ))}
                    </select>

                </div>

                {/* instock */}
                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">Instock</label>

                    <input 
                        type="Number" 
                        className="input"
                        placeholder='instock' 
                        value={formData.instock}
                        onChange={(e) => setFormData({...formData , instock : e.target.value})}
                    />

                </div>

                {/* price */}
                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">Regular Price</label>

                    <input 
                        type="Number" 
                        className="input"
                        placeholder='regularPrice' 
                        value={formData.regularPrice}
                        onChange={(e) => setFormData({...formData , regularPrice : e.target.value})}
                    />

                </div>

                {/* latest && offer && featured */}
                <div className="flex items-center justify-between">
                
                {/* offer */}
                <div className="flex items-center gap-x-2">

                    <input 
                    type="checkbox"  
                    className=""
                    checked={formData.offer}
                    onChange={(e) => setFormData({...formData , offer : e.target.checked})}
                    />

                    <label htmlFor="" className="label">Offer</label>

                </div>

                {/* latest */}
                <div className="flex items-center gap-x-2">

                    <input 
                    type="checkbox"  
                    className=""
                    checked={formData.latest}
                    onChange={(e) => setFormData({...formData , latest : e.target.checked})}
                    />

                    <label htmlFor="" className="label">Latest</label>

                </div>

                {/* featured */}
                <div className="flex items-center gap-x-2">

                    <input 
                    type="checkbox"  
                    className=""
                    checked={formData.feature}
                    onChange={(e) => setFormData({...formData , feature : e.target.checked})}
                    />

                    <label htmlFor="" className="label">featured</label>

                </div>

                </div>

                {formData?.offer && (

            
                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">Discount Price</label>

                    <input 
                        type="text" 
                        className="input"
                        placeholder='discountPrice' 
                        value={formData.discountPrice}
                        onChange={(e) => setFormData({...formData , discountPrice : e.target.value})}
                    />

                </div>

                )}

                {/* color */}
                <div className="">
                
                  <label htmlFor="" className="label">Colors</label>
                
                  <Listbox
                    value={selectedColors}
                    onChange={(el) => handleChangeSelectedColor(el)}
                    multiple
                  >
        
                    <div className="relative mt-1">
        
                      <ListboxButton className="z-40 relative w-full cursor-default rounded bg-transparent pl-3 pr-3 text-left px-3 py-4 2xl:py-6 border border-gray-500 sm:text-sm outline-blue-800">
        
                        <span className="">
                          {selectedColors?.map((user) => user.name).join(",")}
                        </span>
        
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <BsChevronExpand size={26}/>
                        </span>
        
                      </ListboxButton>
        
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-0"
                        className="border shadow-md"
                      >
        
                          <ListboxOptions>
        
                            {colors?.map((color,index) => (
        
                              <ListboxOption
                                key={index}
                                className={({active}) => 
                                `relative cursor-default select-none py-2 pl-10 pr-4
                                ${active ? "bg-blue-100 text-blue-500" :"text-black"}`}
                                value={color}
                              >
                                {({selected}) => (
        
                                  <>
        
                                    <div className={clsx(
                                      "flex items-center gap-2 truncate",
                                      selected ? "font-medium" : "font-normal"
                                    )}>
                                      <span className="">{color.name}</span>
                                    </div>
        
                                    {selected && (
        
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-800">
        
                                        <BsCheck className="h-5 w-5"/>
        
                                      </span>
        
                                    )}
        
                                  </>
        
                                )}
                              </ListboxOption>
        
                            ))}
        
                          </ListboxOptions>
                      </Transition>
        
                    </div>
        
                  </Listbox>
                
                </div>

                {/* sizes */}
                <div className="">
                
                    <label htmlFor="" className="label">Sizes</label>
          
                    <Listbox
                      value={selectedSizes}
                      onChange={(el) => handleChangeSelectedSize(el)}
                      multiple
                    >
          
                      <div className="relative mt-1">
          
                        <ListboxButton className="relative w-full cursor-default rounded bg-transparent pl-3 pr-3 text-left px-3 py-4 2xl:py-6 border border-gray-500 sm:text-sm outline-blue-800">
          
                          <span className="">
                            {selectedSizes?.map((user) => user.name).join(",")}
                          </span>
          
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronExpand size={26}/>
                          </span>
          
                        </ListboxButton>
          
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opcity-0"
                          className="border shadow-md"
                        >
          
                            <ListboxOptions>
          
                              {sizes?.map((color,index) => (
          
                                <ListboxOption
                                  key={index}
                                  className={({active}) => 
                                  `relative cursor-default select-none py-2 pl-10 pr-4
                                  ${active ? "bg-blue-100 text-blue-500" :"text-black"}`}
                                  value={color}
                                >
                                  {({selected}) => (
          
                                    <>
          
                                      <div className={clsx(
                                        "flex items-center gap-2 truncate",
                                        selected ? "font-medium" : "font-normal"
                                      )}>
                                          <span className="">{color.name}</span>
                                      </div>
          
                                      {selected && (
          
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-800">
          
                                          <BsCheck className="h-5 w-5"/>
          
                                        </span>
          
                                      )}
          
                                    </>
          
                                  )}
                                </ListboxOption>
          
                              ))}
          
                            </ListboxOptions>
                        </Transition>
          
                      </div>
          
                    </Listbox>
                
                </div>
                

                {/* desctiption */}
                <div className="">
                
                <label htmlFor="" className="label mb-3">Description</label>

                <ReactQuill 
                    theme="snow"
                    placeholder="write something"
                    className="h-60 mb-20 z-40"
                    required
                    onChange={(value) => {
                        setFormData({...formData, description:value})
                    }}
                />

                </div>

                {/* images */}
                <div className="space-y-3">

                <input 
                    type="file" 
                    className="border border-gray-500 w-full"
                    accept='image/*' 
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                />

                <button 
                    className="btn2 w-full rounded-full"
                    disabled={uploading}
                    onClick={handleImageSubmit}
                >
                    {uploading ? 
                        (
                        <div className="flex items-center gap-5 justify-center">
                            <span className="loading"/> {imageUploadProgress }%
                        </div>
                        ) 
                        : 
                        ("upload")
                    }
                </button>

                {imageUploadError && (

                    <Alert color="failure">{imageUploadError}</Alert>
                )}

                {formData?.images?.length > 0 && (

                    formData?.images?.map((url,index) => (

                    <div 
                        className="flex items-center justify-between"
                        key={index}
                    >

                        <img 
                        src={url} 
                        alt="" 
                        className="w-20 h-20 object-cover" 
                        />

                        <button 
                        className="text-rose-700"
                        onClick={() => handleRemoveImage(index)}
                        >
                        Delete
                        </button>

                    </div>

                    ))

                )}

                </div>

                {/* button */}
                <button 
                    className="btn rounded w-full"
                    type="submit"
                    disabled={loading || uploading}
                >
                {loading ? 
                    (
                    <div className="flex items-center justify-center">
                        <span className="loading"/> Loading  . . . .
                    </div>
                    ) 
                    : 
                    ("submit")}
                </button>

                {error && (

                <Alert color="failure">{error}</Alert>

                )}

            </form>

            </section>

        )}

        {productLoading && !productError && (

           <Loading/>

        )}

        {productError && (
            
            <Error retry={fetchProduct}/>

        )}

    </>

  )

}
