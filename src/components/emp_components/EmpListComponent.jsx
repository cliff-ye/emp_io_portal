import "./EmpListComponent.css";
import HeaderComponent from "./HeaderComponent";
import { Link } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import { useEffect, useState } from "react";
import { retrieveAllEmployees } from "./api_services/EmployeeApiService";

export default function EmpListComponent() {
  const [empdata, setEmpData] = useState([]);
  useEffect(() => loadEmployeeData(), []);

  function loadEmployeeData() {
    retrieveAllEmployees()
      .then((response) => setEmpData(response.data))
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
                    <Link to="#" className="btn btn-danger" role="button">
                      delete
                    </Link>
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
