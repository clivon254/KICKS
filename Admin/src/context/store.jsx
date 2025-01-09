
import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const StoreContext = createContext(null)


export default function StoreContextProvider (props){

    const url = "http://localhost:1500"

    const [token ,setToken] = useState(localStorage.getItem("token"))

    const [open ,setOpen] = useState(false)

    const [cartAmount ,setCartAmount] = useState(null)

    const [cartNumber ,setCartNumber] = useState(null)

    const [cartItems , setCartItems] = useState(null)

    const [cartData , setCartData] = useState(null)

    const [cartOpen ,setCartOpen] = useState(false)

    const [products , setProducts] = useState([])

    const [productLoading , setProductLoading] = useState(false)

    const [productError , setProductError] = useState(false)

    const [orders ,setOrders] = useState([])

    const [orderLoading ,setOrderLoading] = useState(false)

    const [orderError ,setOrderError] = useState(false)

    const [coupons ,setCoupons] = useState([])

    const [couponLoading ,setCouponLoading] = useState(false)

    const [couponError ,setCouponError] = useState(false)

    const [colors , setColors] = useState([])

    const [colorLoading ,setColorLoading] = useState(false)

    const [colorError , setColorError] = useState(false)

    const [sizes , setSizes] = useState([])

    const [sizeLoading ,setSizeLoading] = useState(false)

    const [sizeError , setSizeError] = useState(false)

    const [brands , setBrands] = useState([])

    const [brandLoading ,setBrandLoading] = useState(false)

    const [brandError , setBrandError] = useState(false)

    const [categorys , setCategorys] = useState([])

    const [categoryLoading ,setCategoryLoading] = useState(false)

    const [categoryError , setCategoryError] = useState(false)

    const [stats ,setStats] = useState(null)

    const [statsLoading , setStatsLoading] = useState(false)

    const [statsError ,setStatsError] = useState(false)



    // fetch products
    const fetchProducts = async () => {

        setProductLoading(true)

        setProductError(false)

        try
        {
            const res = await axios.get(url + "/api/product/get-products")

            if(res.data.success)
            {
                setProducts(res.data.products)

                setProductLoading(false)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setProductError(true)
        }

    }


    // getcart
    const getCart = async () => {

        try
        {
            const res = await axios.get(url + "/api/cart/get-cart",{headers:{token}})

            if(res.data.success)
            {
                setCartNumber(res.data.totalProducts)

                setCartItems(res.data.cartData)

                setCartAmount(res.data.totalPrice)
            }

        }
        catch(error)
        {
            if(error.response)
            {
                console.log(error.response.data.message)
            }
            else
            {
                console.log(error.message)
            }
        }

    }

    // fetchOrder
    const fetchOrders = async () => {

        setOrderLoading(true)

        setOrderError(false)

        try
        {
            const res = await axios.get(url + "/api/order/get-adminOrders",{headers:{token}})

            if(res.data.success)
            {
                setOrders(res.data.orders)

                setOrderLoading(false)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setOrderError(true)

            setOrderLoading(false)

        }

    }

    // fetchCoupons
    const fetchCoupons = async () => {

        setCouponLoading(true)

        setCouponError(false)

        try
        {
            const res = await axios.get(url + "/api/coupon/get-coupons",{headers:{token}})

            if(res.data.success)
            {
                setCouponLoading(false)

                setCoupons(res.data.coupons)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setCouponLoading(false)
        }

    }

    // fetchColors
    const fetchColors = async () => {

        setColorLoading(true)

        setColorError(false)

        try
        {
            const res = await axios.get(url + "/api/color/get-colors")

            if(res.data.success)
            {
                setColorLoading(false)

                setColors(res.data.colors)
            }

        }
        catch(error)
        {
            setColorLoading(false)

            setColorError(true)

            console.log(error.message)
        }

    }

    // fetchColors
    const fetchSizes = async () => {

        setSizeLoading(true)

        setSizeError(false)

        try
        {
            const res = await axios.get(url + "/api/size/get-sizes")

            if(res.data.success)
            {
                setSizeLoading(false)

                setSizes(res.data.sizes)
            }

        }
        catch(error)
        {
            setSizeLoading(false)

            setSizeError(true)

            console.log(error.message)
        }

    }

    // fetchBrands
    const fetchBrands = async () => {

        setBrandLoading(true)

        setBrandError(false)

        try
        {
            const res = await axios.get(url + "/api/brand/get-brands")

            if(res.data.success)
            {
                setBrandLoading(false)

                setBrands(res.data.brands)
            }

        }
        catch(error)
        {
            setBrandLoading(false)

            setBrandError(true)

            console.log(error.message)
        }

    }

    // fetchCategorys
    const fetchCategorys = async () => {

        setCategoryLoading(true)

        setCategoryError(false)

        try
        {
            const res = await axios.get(url + "/api/category/get-categorys")

            if(res.data.success)
            {
                setCategoryLoading(false)

                setCategorys(res.data.categorys)
            }

        }
        catch(error)
        {
            setCategoryLoading(false)

            setCategoryError(true)

            console.log(error.message)
        }

    }

    // fetchstats
    const fetchStats = async () => {

        try
        {
            setStatsLoading(true)

            setStatsError(false)

            const res = await axios.post(url + "/api/product/stats",{},{headers:{token}})

            if(res.data.success)
            {
                setStatsLoading(false)

                setStats(res.data)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setStatsLoading(false)

            setStatsError(true)
        }

    }

    console.log(stats)
    
    useEffect(() => {

        getCart()

        fetchProducts()

        fetchOrders()

        fetchCoupons()

        fetchColors()

        fetchSizes()

        fetchCategorys()

        fetchBrands()

        fetchStats()

    },[])


    useEffect(() => {

      const tempData = []

      for(const itemId in cartItems)
      {
        
        let hasSizes = false

        if(typeof cartItems[itemId] === 'object')
        {

            for(const size in cartItems[itemId])
            {

                hasSizes = true

                if(typeof cartItems[itemId][size] === 'object')
                {

                    for(const color in cartItems[itemId][size])
                    {
                        const quantity = cartItems[itemId][size][color]

                        if(quantity > 0 )
                        {

                            tempData.push({
                                _id:itemId,
                                size:size,
                                color:color,
                                quantity:quantity
                            })

                        }

                    }

                }
                else
                {
                    const quantity = cartItems[itemId][size]

                    if(quantity > 0)
                    {

                        tempData.push({
                            _id:itemId,
                            size:size,
                            quantity:quantity
                        })
                    }
                }

            }

            // If there are no sizes, check for colors directly
            if (!hasSizes) {

                for (const color in cartItems[itemId]) {

                    const quantity = cartItems[itemId][color];

                    if (quantity > 0) {
                
                        tempData.push({
                            _id: itemId,
                            color: color,
                            quantity: quantity
                        })

                    }
                }
            }

        }
        else
        {

            if(cartItems[itemId] > 0)
            {

                tempData.push({
                    _id:itemId,
                    quantity:cartItems[itemId]
                })

            }

        }

      }

      setCartData(tempData)

    },[cartItems])



    const contextValue = {
        url,
        token,setToken,
        open,setOpen,
        cartItems,setCartItems,
        cartNumber,setCartNumber,
        cartAmount,setCartAmount,
        cartData,setCartData,
        cartOpen,setCartOpen,
        getCart,
        products,setProducts,
        productLoading,setProductLoading,
        productError,setProductError,
        fetchProducts,
        orders,setOrders,
        orderLoading,setOrderLoading,
        orderError,setOrderError,
        fetchOrders,
        coupons,setCoupons,
        couponLoading,setCouponLoading,
        couponError,setCouponError,
        fetchCoupons,
        colors,setColors,
        colorLoading,setColorLoading,
        colorError,setColorError,
        fetchColors,
        sizes,setSizes,
        sizeLoading,setSizeLoading,
        sizeError,setSizeError,
        fetchSizes,
        brands,setBrands,
        brandLoading,setBrandLoading,
        brandError,setBrandError,
        fetchBrands,
        categorys,setCategorys,
        categoryLoading,setCategoryLoading,
        categoryError,setCategoryError,
        fetchCategorys,
        stats,setStats,
        statsLoading,setStatsLoading,
        statsError,setStatsError,
        fetchStats
    }

    return(

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )

}