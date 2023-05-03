import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    const activeUserEmail = localStorage.getItem("activeUser");
    // console.log("useEffect  activeUserEmail:", activeUserEmail);
    if (activeUserEmail) {
      setAppLoading(true);
      const getUserData = async () => {
        const response = await axios.get(
          `http://localhost:3004/users?email=${activeUserEmail}`
        );
        if (response.status === 200) {
          const user = response.data[0];
          const { password, ...remainedData } = user;
          setUserData(remainedData);
          setTimeout(() => {
            setAppLoading(false);
          }, 1000);
        }
      };

      getUserData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, appLoading }}>
      {children}
    </UserContext.Provider>
  );
};
