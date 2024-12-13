import { createContext, useState } from "react"


export const StoreContext = createContext(null)


export default function StoreContextProvider (props){

    const url = "http://localhost:1500"

    const [token ,setToken] = useState(localStorage.getItem("token"))

    const contextValue = {
        url,
        token,setToken
    }

    return(

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )

}