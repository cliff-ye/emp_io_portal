import { createContext, useContext, useState } from "react";
import { runBasicAuth } from "../api_services/EmployeeApiService";
import { apiClient } from "../api_services/ApiClient";

//1. create a context: this will retain state and allow you share across pages.
//eg. if a user logs in the state will be maintain and passed to other components
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

//2. share the created context with other components
export default function AuthProvider({ children }) {
  //3. Put some state in the context
  const [isAuthenticated, setAuth] = useState(false);

  const [token, setToken] = useState(null);

  //add basic auth
  const loginUser = async function login(username, password) {
    const basicAuthToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await runBasicAuth(basicAuthToken);

      if (response.status === 200) {
        setAuth(true);
        setToken(basicAuthToken);
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = basicAuthToken;
          return config;
        });
        return true;
      } else {
        logoutUser();
        return false;
      }
    } catch (error) {
      logoutUser();
      return false;
    }
  };

  function logoutUser() {
    setAuth(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuth, token, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
