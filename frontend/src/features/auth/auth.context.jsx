import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const authContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true); // Initial load state

    useEffect(()=>{
        const getAndSetUser=async()=>{
            try {
                const data=await getMe();
                if(data && data.data) {
                    setUser(data.data.user);
                }
            } catch(e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        getAndSetUser();
    },[]);

    return (
        <authContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </authContext.Provider>
    )
}