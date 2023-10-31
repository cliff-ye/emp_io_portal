import "./EmpListComponent.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "./security/AuthContext";
import { useState } from "react";

export default function HeaderComponent() {
  const authContext = useAuthContext();

  const navigate = useNavigate();
  const alertLogoutMsg = () => {
    Swal.fire({
      title: "Logged out",
      text: "successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleLogout = function () {
    authContext.logoutUser();
    alertLogoutMsg();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5" to="/emp-list">
            <span>emp.io</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link " aria-current="page" to="/emp-list">
                <span>All Employees</span>
              </Link>
            </div>
            <div className="d-flex ms-auto">
              <button
                className="btn btn-primary btn-logout"
                type="button"
                name="login"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
