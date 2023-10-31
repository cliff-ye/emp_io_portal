import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const retrieveAllEmployees = () => apiClient.get("/employees");

export const deleteEmp = (id) => apiClient.delete(`/employees/${id}`);

export const retrieveEmployee = (id) => apiClient.get(`/employees/${id}`);

export const updateEmp = (employee) => apiClient.put(`/employees`, employee);
