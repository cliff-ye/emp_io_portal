import "./EmpApp.css";
import { useParams } from "react-router-dom";
import {
  retrieveEmployee,
  updateEmp,
  createEmp,
} from "./api_services/EmployeeApiService";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HeaderComponent from "./HeaderComponent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "./security/AuthContext";

export default function EmployeeComponent() {
  const navigate = useNavigate();
  const { id } = useParams();
  //[id] - means the page refreshes only when id value changes
  useEffect(() => loadEmpData, [id]);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  function loadEmpData() {
    if (id != 0) {
      retrieveEmployee(id)
        .then((response) => {
          setFullname(response.data.fullName);
          setAddress(response.data.address);
          setBirthDate(response.data.birthDate);
          setEmail(response.data.emailAddress);
        })
        .catch((error) => console.log(error));
    }
  }

  const updateMsg = (msg) => {
    Swal.fire({
      title: `${msg}`,
      text: "",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  function onSubmit(formValues) {
    console.log(formValues);
    const employee = {
      id,
      fullName: formValues.fullname,
      address: formValues.address,
      birthDate: formValues.birthDate,
      emailAddress: formValues.email,
    };

    const msg =
      employee.id === 0 ? "added successfully" : "updated successfully";

    if (employee.id != 0) {
      updateEmp(employee)
        .then((response) => {
          updateMsg(msg);
          navigate("/emp-list");
        })
        .catch((error) => console.log(error));
    } else {
      createEmp(employee)
        .then((response) => {
          updateMsg(msg);
          navigate("/emp-list");
        })
        .catch((error) => console.log(error));
    }
  }

  function formValidation(formValues) {
    let error = {};

    if (formValues.fullname.length < 1 || !formValues.fullname.includes(" "))
      error.fullname = "Full name required";
    if (formValues.birthDate === null || formValues.birthDate === "")
      error.birthDate = "Date of birth required";
    if (formValues.email.length < 1 || !formValues.email.includes("@"))
      error.email = "Invalid email";
    if (formValues.address.length < 1) error.address = "address required";
    return error;
  }

  return (
    <>
      <HeaderComponent />
      <div className="container mt-5">
        <h1 className="mb-3">Employee Details </h1>
        <Formik
          initialValues={{ fullname, address, birthDate, email }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={formValidation}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="fullname"
                component="div"
                className="alert alert-danger"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="alert alert-danger"
              />
              <ErrorMessage
                name="birthDate"
                component="div"
                className="alert alert-danger"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
              <div className="row mb-3">
                <fieldset className="col form-group">
                  <label className="form-label">Full name</label>
                  <Field
                    type="text"
                    className="form-control "
                    name="fullname"
                  />
                </fieldset>
                <fieldset className="col form-group">
                  <label className="form-label">Address</label>
                  <Field type="text" className="form-control" name="address" />
                </fieldset>
              </div>
              <div className="row">
                <fieldset className="col form-group">
                  <label className="form-label">Birthdate</label>
                  <Field
                    type="date"
                    className="form-control"
                    name="birthDate"
                  />
                </fieldset>
                <fieldset className="col form-group">
                  <label className="form-label">Email</label>
                  <Field type="email" className="form-control" name="email" />
                </fieldset>
              </div>

              <div>
                <button
                  className="btn btn-success btn-look mt-5 float-end"
                  type="submit"
                >
                  save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
