import "./EmpListComponent.css";
import HeaderComponent from "./HeaderComponent";
import { Link } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import { useEffect, useState } from "react";
import {
  deleteEmp,
  retrieveAllEmployees,
} from "./api_services/EmployeeApiService";
import Swal from "sweetalert2";

export default function EmpListComponent() {
  const [empdata, setEmpData] = useState([]);
  useEffect(() => loadEmployeeData(), []);

  function loadEmployeeData() {
    retrieveAllEmployees()
      .then((response) => setEmpData(response.data))
      .catch((error) => console.log(error));
  }

  const deleteMsg = (msg) => {
    Swal.fire({
      title: `${msg}`,
      text: "",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  function deleteEmployee(id) {
    console.log(id);
    deleteEmp(id)
      .then((response) => {
        console.log(response);
        deleteMsg(response.data);
        loadEmployeeData();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <HeaderComponent />
      <div className="EmpListComponent">
        <div>
          <h1>Employees </h1>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Full Name</th>
                <th scope="col">Address</th>
                <th scope="col">Birth Date</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {empdata.map((emp_data) => (
                <tr key={emp_data.id}>
                  <td>{emp_data.id}</td>
                  <td>{emp_data.fullName}</td>
                  <td>{emp_data.address}</td>
                  <td>{emp_data.birthDate}</td>
                  <td>{emp_data.emailAddress}</td>
                  <td>
                    <Link to="#" className="btn btn-info" role="button">
                      update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(emp_data.id)}
                      role="button"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
