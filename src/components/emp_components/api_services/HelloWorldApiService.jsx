import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});
export const getHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const getHelloWorldPathVar = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`);
