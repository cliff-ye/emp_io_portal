import { createContext, useContext, useState } from "react";

//1. create a context: this will retain state and allow you share across pages.
//eg. if a user logs in the state will be maintain and passed to other components
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

//2. share the created context with other components
export default function AuthProvider({ children }) {
  //3. Put some state in the context
  const [isAuthenticated, setAuth] = useState(false);

  const loginUser = function login(username, password) {
    if (username === "clifford" && password === "12345") {
      setAuth(true);
      return true;
    } else {
      return false;
    }
  };

  function logoutUser() {
    setAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuth, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
