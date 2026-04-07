import axios from "axios";

const api=axios.create({
    baseURL:"https://resume-tracker-backend-wiav.onrender.com/api/auth",
    withCredentials:true
});

export async function Register({username,email,password})
{
    try{
        return await api.post("/register",{username,email,password},{
            withCredentials:true
        });
    }
    catch(error){
        console.log(error);
    }
}

export async function Login({email,password})
{
    try{
        return await api.post("/login",{email,password},{
            withCredentials:true
        });
    }
    catch(error){
        console.log(error);
    }
}

export async function Logout()
{
    try{
        return await api.post("/logout",{},{
            withCredentials:true
        });
    }
    catch(error){
        console.log(error);
    }
}


export async function getMe()
{
    try{
        return await api.get("/get-me",{
            withCredentials:true
        });
    }
    catch(error){
        console.log(error);
    }
}
