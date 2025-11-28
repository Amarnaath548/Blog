import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";



export const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);

    useEffect(()=>{
        const stored=localStorage.getItem('user');
        if(stored) setUser(JSON.parse(stored));

    },[])

    const login=(data)=>{
        localStorage.setItem('token',data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        setUser(data.user);
    }

    const logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    const value={login,logout,user}

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}