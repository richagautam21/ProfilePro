import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const userContext = createContext();

const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [dataArr, setDataArr] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const storedData = localStorage.getItem("userData");
  
      const getData = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get("https://panorbit.in/api/users.json");
          const userData = res.data;
          setIsLoading(false);
          setUsers(userData.users);
          localStorage.setItem("userData", JSON.stringify(userData.users));
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          setError("An error occurred while fetching user data.");
        }
      };
  
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setDataArr(parsedData);
        } catch (error) {
          console.error(error);
          setError("An error occurred while parsing stored data.");
          localStorage.removeItem("userData");
        }
      }
  
      getData();
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <userContext.Provider value={{ users, dataArr, isLoading }}>
        {children}
      </userContext.Provider>
    );
  };
  
  export default UserProvider;