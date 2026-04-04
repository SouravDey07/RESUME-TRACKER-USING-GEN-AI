import { useContext,useEffect } from "react";
import { authContext } from "../auth.context";
import {Login,Register,Logout,getMe} from "../services/auth.api";

export const useAuth=()=>{
    const context=useContext(authContext);
    const{user,setUser,loading,setLoading}=context;

    const handleLogin=async({email,password})=>{
        setLoading(true);
        try{
            const data=await Login({email,password});
            console.log(data);
            if(data && data.data) {
                setUser(data.data.user);
                return true;
            }
            return false;
        }
        catch(error){
            console.log(error);
            return false;
        }
        finally{
            setLoading(false);
        }
    }    
    const handleRegister=async({username,email,password})=>{
        setLoading(true);
        try{
            const data=await Register({username,email,password});
            if(data && data.data) {
                setUser(data.data.user);
                return true;
            }
            return false;
        }
        catch(error){
            console.log(error);
            return false;
        }
        finally{
            setLoading(false);
        }
    }
    const handleLogout=async()=>{
        setLoading(true);
        try{
            const data=await Logout();
            setUser(null);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    const handleGetMe=async()=>{
        setLoading(true);
        try{
            const data=await getMe();
            if(data && data.data) setUser(data.data.user);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }


    return {
        user,
        setUser,
        loading,
        setLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetMe
    }

}
