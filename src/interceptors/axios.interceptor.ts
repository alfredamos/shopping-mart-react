import axios from "axios";
import { authService, userSubInitial } from "../services/auth.service";

const baseURL = "http://localhost:3000/api";

//----> Default config options
const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

//----> Create instance
const instance = axios.create(defaultOptions);

//----> Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const { token } = authService.getCurrentAuthUser();
  console.log("In interceptor : " + token);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//----> Response interceptor.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("In response-interceptor,  response : ", error);
    if (error.response.status === 401) {
      console.log("Invalid credentials or expired token, please login!");
      authService.updateAuthUser$(userSubInitial);
      window.location.href = "/must-login";
    } else if (error.response.status === 403) {
      console.log("You are not authorized to view this page, please login!");
      authService.updateAuthUser$(userSubInitial);
      window.location.href = "/not-allowed";
    } else {
      console.log("Oops something went wrong, please login!");
      authService.updateAuthUser$(userSubInitial);
      window.location.href = "/something-wrong";
    }
  }
);

export default instance;

