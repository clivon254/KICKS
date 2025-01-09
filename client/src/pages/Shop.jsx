

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import ProductCard from '../components/ProductCard'
import { FaSlidersH } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import _ from "lodash"


export default function Shop() {

    const {products,brands,categorys} = useContext(StoreContext)

    const [filteredProducts , setFilteredProducts] = useState([])

    const [filterOpen ,setFilterOpen] = useState(false)

    const [category ,setCategory] = useState([])

    const [brand ,setBrand] = useState([])

    const [sortType ,setSortType] = useState("featured")

    // toggleCategory
    const toggleCategory = (e) => {

        if(category.includes(e.target.value))
        {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else
        {
            setCategory(prev => [...prev , e.target.value])
        }

    }

    // toggleBrand
    const toggleBrand = (e) => {

        if(brand.includes(e.target.value))
        {
            setBrand(prev => prev.filter(item => item !== e.target.value))
        }
        else
        {
            setBrand(prev => [...prev , e.target.value])
        }
    }

    // apllyfilter
    const applyFilter = () => {

        let productsCopy = products.slice()

        if(category.length > 0)
        {
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }

        if(brand.length > 0)
        {
            productsCopy = productsCopy.filter(item => brand.includes(item.brand))
        }

        setFilteredProducts(productsCopy)

    }

    // sortProduct
    const sortProduct = () => {

        let fpCopy = filteredProducts.slice()

        switch(sortType)
        {
            case 'low-high':
                setFilteredProducts(fpCopy.sort((a,b) => (a.regularPrice - b.regularPrice)))
                break;
            
            case 'high-low':
                setFilteredProducts(fpCopy.sort((a,b) => (b.regularPrice - a.regularPrice)))
                break;
            
            case 'A-Z':
                setFilteredProducts(fpCopy.sort((a,b) => (b.name - a.name)))
                break;

            case 'Z-A':
                setFilteredProducts(fpCopy.sort((a,b) => (b.name - a.name)))
                break;
            
            default:
                applyFilter()
                break;
        }

    }

    
    // ***  PAGINATION ***//

    const [page ,setPage] = useState(1)

    const [limit ,setLimit] = useState(8)

    const [siblings ,setSiblings] = useState(1)


    // getprofuscts
    const getProducts = (page,limit) => {

        let array = []

        for(let i = (page -1) * limit ; i < (page * limit) && filteredProducts[i] ; i++)
        {
            array.push(filteredProducts[i])
        }

        return array;

    }

    const finalProducts = getProducts(page,limit)

    const finalLength = filteredProducts?.length

    const totalPage = Math.ceil(finalLength / limit)


    // returnPaginationPage
    const returnPaginationPage = (totalPage ,page ,limit,siblings) => {

        let totalPageNoInArrray = 7 + siblings

        if(totalPageNoInArrray >= totalPage)
        {
            return _.range(1 ,totalPage + 1)
        }

        let leftSiblingsIndex = Math.max(page - siblings , 1)

        let rightSiblingsIndex = Math.min(page + siblings, totalPage)


        let showLeftDots = leftSiblingsIndex > 2 ;

        let showRightDots = rightSiblingsIndex < totalPage - 2

        if(!showLeftDots && showRightDots)
        {
            let leftItemsCount = 3 + 2 * siblings ;

            let leftRange = _.range(1 ,leftItemsCount + 1)

            return [...leftRange ,"...", totalPage]
        }
        else if(showLeftDots && !showRightDots)
        {
            let rightItemsCount = 3 + 2 * siblings

            let rightRange = _.range(totalPage - rightItemsCount + 1,totalPage +1)

            return [1, "...", ...rightRange]
        }
        else
        {
            let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)

            return[1,"...",...middleRange,"...",totalPage]
        }

    }

    const array = returnPaginationPage(totalPage,page,limit,siblings)

    // handlePageChange
    const handlePageChange = (value) => {

        if(value === "&laquo;")
        {
            setPage(1)
        }
        else if(value === "&lsquo;")
        {
            if(page !== 1)
            {
                setPage(page -1)
            }
        }
        else if(value === "&raquo;" )
        {
            if(page !== totalPage)
            {
                setPage(page+1)
            }
        }
        else if(value === "&rsquo;")
        {
            setPage(totalPage)
        }
        else
        {
            setPage(value)
        }

    }


    useEffect(() => {

        window.scrollTo(0, 0);

        setFilteredProducts(products)

    },[products,page])


    useEffect(() => {

        window.scrollTo(0, 0);

        applyFilter()

    },[category,brand])


    useEffect(() => {

        window.scrollTo(0, 0);

        sortProduct()

    },[sortType])


  return (

    <>

        <section className="section">

            <div className="w-full flex flex-col lg:flex-row gap-y-3  sm:gap-10">


                {/* filter options */}
                <div className="hidden lg:block w-full lg:w-[20%] space-y-3">

                    <h2 className="title2 uppercase">Filter</h2>

                    {/*brand*/}
                    <div className="">

                        <h3 className="title3">Brands</h3>

                        {brands.length > 1 && (

                            <>

                                {brands.map((brand,index) => (

                                    <div key={index} className=" flex items-center gap-x-4 cursor-pointer">

                                        <input 
                                            type="checkbox" 
                                            className="rounded" 
                                            value={brand.name}
                                            onChange={toggleBrand}
                                        />

                                      <label className="label">{brand.name}</label>

                                    </div>
                                ))}

                            </>

                        )}
                        

                    </div>

                    {/* category */}
                    <div className="">

                        <h3 className="title3">Categories </h3>

                        {categorys.length > 1 && (

                            <>

                                {categorys.map((category,index) => (

                                    <div key={index} className=" flex items-center gap-x-4 cursor-pointer">

                                            <input 
                                                type="checkbox" 
                                                className="rounded" 
                                                value={category.name}
                                                onChange={toggleCategory}
                                            />

                                            <label className="label">{category.name}</label>

                                    </div>

                                ))}
                            
                            </>
                        )}
                        

                    </div>

                    {/* price */}
                    <div className="">

                        <h2 className="">Price</h2>

                        <div className="">

                            <input type="range" className="" />

                        </div>

                    </div>

                </div>

                {/* right side */}
                <div className="w-full lg:w-[80%] space-y-5">

                    {/* header */}
                    <div className="flex items-center justify-between lg:justify-end ">

                        {/* filter */}
                        <div 
                            onClick={() => setFilterOpen(true)}
                            className="flex items-center border border-zinc-800 px-4 py-1 rounded gap-x-2 text-sm font-semibold lg:hidden"
                        >
                                <FaSlidersH/>
                                
                                Filters
                        </div>
                        
                        {/* product sort */}
                        <select 
                        onChange={(e) => setSortType(e.target.value)} 
                            className="rounded text-xs font-semibold cursor-pointer "
                        >

                            <option value="featured" > Featured </option>

                            <option value="high-low" >Price : low to high</option>

                            <option value="low-high" >Price : high to low</option>

                            <option value="A-Z" >Alphabetically : A - Z</option>

                            <option value="Z-A" >Alphabetically : Z - A</option>

                        </select>

                    </div>

                    
                    <div className="w-full">

                        {/* product map */}
                        <div className="">

                            {finalProducts.length > 0 ? (

                                <>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-3">

                                        {finalProducts?.map((product,index) => (

                                            <ProductCard key={index} product={product}/>

                                        ))}

                                    </div>

                                </>

                            ) 
                            : 
                            (
                                <p className="text-xl font-semibold text-center">
                                    Sorry there are no products
                                </p>
                            )}

                        </div>

                        {/* pagination */}
                        <div className="w-full flex justify-center items-center">

                            <ul className="flex py-4">

                                <li className="border border-slate-500 flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200 rounded-l-md">
                                    <span onClick={() => handlePageChange("&laquo;")} className="">&laquo;</span>
                                </li>

                                <li className="border border-slate-500 flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200">
                                    <span onClick={() => handlePageChange("&lsquo;")} className="">&lsaquo;</span>
                                </li>

                                {array.map(value => {

                                    if(value === page)
                                    {
                                        return (
                                            <li className="border border-slate-500 flex items-center justify-center h-10 w-10 cursor-pointer bg-primary text-white">
                                                <span onClick={() => handlePageChange(value)} className="">{value}</span>
                                            </li>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <li className="border border-slate-500 flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200">
                                                <span onClick={() => handlePageChange(value)} className="">{value}</span>
                                            </li>
                                        )
                                    }

                                })}
                                
                                <li className="border border-slate-500 flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200">
                                    <span onClick={() => handlePageChange("&raquo;")} className="">&rsaquo;</span>
                                </li>

                                <li className="border border-slate-500 flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200 rounded-r-md">
                                    <span onClick={() => handlePageChange("&rsquo;")} className="">&raquo;</span>
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </section>

        {filterOpen && (

            <div className={`w-full h-full  z-50 fixed top-0  bg-black/50 backdrop-blur-sm  origin-right transition-all  duration-200 ease-in  lg:hidden ${open ? "left-0" :"left-[-100%]"}`}>

                <div className="absolute  left-0 w-[60%] md:w-[35%] h-full bg-white space-y-3 p-3 ">

                        <div className="flex items-center justify-between border-b border-secondary pb-3">

                           <span className="text-xl uppercase font-semibold">
                            filters
                           </span>

                            <span className="cursor-pointer">
                                <MdClose size={32} onClick={() => setFilterOpen(false)} />
                            </span>

                        </div>

                        <div className="flex flex-col gap-y-5">

                            {/*brand*/}
                            <div className="">

                                <h3 className="title3">Brands</h3>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'Jordans'}
                                        onChange={toggleBrand}
                                    />

                                    <label className="label">jordans</label>

                                </div>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'Nike'}
                                        onChange={toggleBrand}
                                    />

                                    <label className="label">Nike</label>

                                </div>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'Addidas'}
                                        onChange={toggleBrand}
                                    />

                                    <label className="label">Addidas</label>

                                </div>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'prada'}
                                        onChange={toggleBrand}
                                    />

                                    <label className="label">Prada</label>

                                </div>

                            </div>

                            {/* category */}
                            <div className="">

                                <h3 className="title3">Categories </h3>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'men'}
                                        onChange={toggleCategory}
                                    />

                                    <label className="label">men</label>

                                </div>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'women'}
                                        onChange={toggleCategory}
                                    />

                                    <label className="label">women</label>

                                </div>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'kids'}
                                        onChange={toggleCategory}
                                    />

                                    <label className="label">kids</label>

                                </div>

                                <div className=" flex items-center gap-x-4 cursor-pointer">

                                    <input 
                                        type="checkbox" 
                                        className="rounded" 
                                        value={'unisex'}
                                        onChange={toggleCategory}
                                    />

                                    <label className="label">unisex</label>

                                </div>

                            </div>

                            {/* price */}
                            <div className="">

                                <h2 className="">Price</h2>

                                <div className="">

                                    <input type="range" className="" />

                                </div>

                            </div>
                       
                        </div>

                </div>

            </div>

        )}

    </>

  )

}
