import "./EmpListComponent.css";
import HeaderComponent from "./HeaderComponent";
import { Link } from "react-router-dom";
import FooterComponent from "./FooterComponent";

export default function EmpListComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );
  const empdata = [
    {
      id: 1,
      fullName: "John Doe",
      address: "Accra, Ghana",
      birthDate: targetDate,
      emailAddress: "jd@gmail.com",
    },
    {
      id: 2,
      fullName: "Precious Wills",
      address: "Central, Ghana",
      birthDate: targetDate,
      emailAddress: "precious.wills@gmail.com",
    },
    {
      id: 3,
      fullName: "Max Brown",
      address: "Volta, Ghana",
      birthDate: targetDate,
      emailAddress: "maxb@gmail.com",
    },
  ];

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
                  <td>{emp_data.birthDate.toDateString()}</td>
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
