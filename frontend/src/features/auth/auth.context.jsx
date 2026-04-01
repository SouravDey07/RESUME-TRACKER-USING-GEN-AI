import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const authContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true); // Initial load state

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await getMe();
                if (response && response.data && response.data.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Make sure to stop loading
            }
        }
        verifyUser();
    }, []);

    return (
        <authContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </authContext.Provider>
    )
}