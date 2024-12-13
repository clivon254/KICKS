
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




    // getcart
    const getCart = async () => {

        try
        {
            const res = await axios.get(url + "/api/cart/get-cart",{headers:{token}})

            if(res.data.success)
            {
                setCartNumber(res.data.totalProducts)

                setCartItems(res.data.totalProducts)

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

    useEffect(() => {

        getCart()

    },[])

    const contextValue = {
        url,
        token,setToken,
        open,setOpen,
        cartItems,setCartItems,
        cartNumber,setCartNumber,
        cartAmount,setCartAmount
    }

    return(

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )

}