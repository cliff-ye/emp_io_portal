import "./Login.css";
import "./EmpApp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "./security/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("clifford");
  const [password, setPass] = useState("12345");
  const [failedMsg, setFailMsg] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const getNewUsername = function (event) {
    setUsername(event.target.value);
  };

  const getNewPass = function (event) {
    setPass(event.target.value);
  };

  const alertMsg = () => {
    Swal.fire({
      title: `Welcome ${username}`,
      text: "successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = function () {
    if (authContext.loginUser(username, password)) {
      alertMsg();
      navigate("/emp-list");
    } else {
      setFailMsg(true);
    }
  };

  return (
    <>
      <div className="login">
        {failedMsg && (
          <div className="alert alert-danger">Authentication failed</div>
        )}
        <div className="loginModal">
          <div className="LoginForm">
            {/* <img src={window.location.origin + "/icons8_customer_1.ico"} /> */}
            <div className="mt-3 mb-3">
              <input
                type="text"
                name="username"
                className="form-control inputlook"
                placeholder="Enter username"
                value={username}
                onChange={getNewUsername}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control inputlook"
                placeholder="Enter password"
                value={password}
                onChange={getNewPass}
              />
            </div>
            <div>
              <button
                type="button"
                name="login"
                onClick={handleSubmit}
                className="btn--look"
              >
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
