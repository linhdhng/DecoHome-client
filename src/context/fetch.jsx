import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies();

  const login = async (formData) => {
    let res = await axios({
      method: "POST",
      url: "https://decohome-server-1.onrender.com/api/auth",
      data: formData,
    });

    setCookies("token", res.data.token); // your token
  };

  const signUp = async (formData) => {
    let res = await axios({
      method: "POST",
      url: "https://decohome-server-1.onrender.com/api/users",
      data: formData,
    });

    setCookies("token", res.data.token); // your token
  };

  const logout = () => {
    ["token"].forEach((obj) => removeCookie(obj)); // remove data save in cookies
  };

  // const getUserId = async() => {
  //   const res = await axios.get('https://decohome-server-1.onrender.com/api/users')
  // }
  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      signUp,
      // getUserId,
    }),
    [cookies]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAuth = () => {
  return useContext(AppContext);
};
