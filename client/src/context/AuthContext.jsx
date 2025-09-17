import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext();

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


  return (
    <AuthContext.Provider value={{login,logout,user}}>
        {children}
    </AuthContext.Provider>
  )
}

