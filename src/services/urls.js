import axios from "axios";

export const baseUrl = "https://upskilling-egypt.com:3006/api/v1";
export const imgBaseUrl = "https://upskilling-egypt.com:3006/";

export const publicAxiosInstance = axios.create({
   baseURL: baseUrl, 
  });
export const privateAxiosInstance = axios.create({
   baseURL: baseUrl, 
   headers :{Authorization : localStorage.getItem("token")}
  });

export const USER_URLS = {
  LOGIN: "/Users/Login",
  REGISTER: "/Users/Register",
  FORGET_PASS: "/Users/Reset/Request",
  RESET_PASS: "/Users/Reset",
  CHANGE_PASS : "/Users/ChangePassword",
  GET_USER: (id) => `/Users/$(id}`,
};

export const CATEGORIES_URLS = {
  CATEGORIES_LIST : (pageSize,pageNumber) => `/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  CATEGORY : (id)=> `/Category/${id}`,
  ADD_CATEGORY : "/Category/",
};

export const RECIPES_URLS = {
  RECIPES_LIST : (pageSize,pageNumber) => `/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  RECIPE : (id)=> `/Recipe/${id}`,
  ADD_RECIPE : "/Recipe/",
};
export const USERS_URLS = {
  USERS_LIST : (pageSize,pageNumber) => `/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  USERS : (id)=> `/Users/${id}`,
  ADD_USER : "/Users/",
};