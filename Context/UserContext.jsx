'use client'
import { createContext, useState } from "react";


export const userContext = createContext(null);

export const UserContextProvider = ({children}) =>{
    const [email, setEmail] = useState("");
    const [isAuth, setIsAuth] = useState(false)
    const [password, setPassword] = useState("");

    const value = {
        email, setEmail, password, setPassword, isAuth, setIsAuth
    }

    return(
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}

