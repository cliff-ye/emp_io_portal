import Login from "./Login";
import ErrorComponent from "./ErrorComponent";
import EmpListComponent from "./EmpListComponent";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthProvider, { useAuthContext } from "./security/AuthContext";
import EmployeeComponent from "./EmployeeComponent";

function AuthenticateRoute({ children }) {
  const authContext = useAuthContext();
  if (authContext.isAuthenticated) return children;
  return <Navigate to="/" />;
}

export default function EmpApp() {
  return (
    <>
      <div className="EmpApp">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/emp-list"
                element={
                  <AuthenticateRoute>
                    <EmpListComponent />
                  </AuthenticateRoute>
                }
              />
              <Route
                path="/employee/:id"
                element={
                  <AuthenticateRoute>
                    <EmployeeComponent />
                  </AuthenticateRoute>
                }
              />
              <Route path="*" element={<ErrorComponent />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}
