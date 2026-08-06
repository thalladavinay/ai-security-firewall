"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}


const AuthContext =
  createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
  });



export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [isLoggedIn,setIsLoggedIn] =
    useState(false);


  useEffect(()=>{

    const token =
      localStorage.getItem("token");

    setIsLoggedIn(Boolean(token));

  },[]);



  function login(token:string){

    localStorage.setItem(
      "token",
      token
    );

    setIsLoggedIn(true);

  }



  function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setIsLoggedIn(false);

  }



  return (

    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth(){

  return useContext(AuthContext);

}