import { createContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

export const LoginDataContext = createContext();

export function LoginDataProvider({ children }) {

  const [LoginData, setLoginData] = useState(null);
  

  const saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      try {
        let decodedToken = jwtDecode(encodedToken);
        localStorage.setItem("loginData",JSON.stringify(decodedToken) );//test
        setLoginData(decodedToken);

      } catch (error) {
        console.error( error);
        localStorage.removeItem("token");
        setLoginData(null);
      }
    }
  };
  
  
  useEffect(() => {
    saveLoginData();
  }, []);






  return (
    <LoginDataContext.Provider value={{ LoginData, setLoginData }}>
      {children}
    </LoginDataContext.Provider>
  );
}