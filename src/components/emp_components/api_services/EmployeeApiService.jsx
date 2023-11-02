import { apiClient } from "./ApiClient";

export const retrieveAllEmployees = () => apiClient.get("/employees");

export const deleteEmp = (id, token) => apiClient.delete(`/employees/${id}`);

export const retrieveEmployee = (id, token) =>
  apiClient.get(`/employees/${id}`);

export const updateEmp = (employee, token) =>
  apiClient.put(`/employees`, employee);

export const createEmp = (employee, token) =>
  apiClient.post(`/employees`, employee);

//execute the basic auth api
export const runBasicAuth = (token) =>
  apiClient.get("/auth", {
    headers: {
      Authorization: token,
    },
  });
