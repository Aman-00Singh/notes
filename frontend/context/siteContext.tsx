import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';
import React from 'react';

export const ActiveActionContext = createContext<any>(null);

export const useActiveActionContext = ():any => { 
    return useContext(ActiveActionContext);
}


export const ActiveActionProvider = ({children}:any) => {

    let [userInfo, setUser] = useState<any>({
        
    })
    let [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const fetchUserData = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/user/getuser`,{withCredentials: true});
          // console.log(res.data);
          setUser(res.data);
        setIsLoggedIn(true);
        } catch (err) {
          console.log(err)
        }
      }
    useEffect(() => {
    fetchUserData();

    }, []);



    return <ActiveActionContext.Provider value={{userInfo, isLoggedIn}}>
        {children}
    </ActiveActionContext.Provider>
}

