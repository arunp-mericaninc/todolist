'use client'
import { app } from "@/utils/firebase";
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const UserContext = createContext(null);

export const UserContextProvider = ({children}) =>{
    const auth = getAuth(app);
    const [User, setUser] = useState({});
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          // console.log("Auth", currentuser);
    
          setUser(currentuser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);

    const value = {
        User
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

