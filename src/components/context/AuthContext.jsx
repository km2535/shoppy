import React, { createContext, useContext, useEffect, useState } from "react";
import {
  firebaseLogout,
  googleLogin,
  onUserStateChange,
} from "../../server/login";
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [fbuser, setFbuser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setFbuser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ fbuser, googleLogin, firebaseLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
