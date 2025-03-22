import axios from "axios";
import Favorites from './../Components/Favorites/Favorites';

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
  VERIFY_ACCOUNT :"/Users/verify",
  CHANGE_PASS : "/Users/ChangePassword",
  GET_USER: (id) => `/Users/$(id}`,
 
};

export const CATEGORIES_URLS = {
  CATEGORIES_LIST : `/Category/`,
  CATEGORY : (id)=> `/Category/${id}`,
  ADD_CATEGORY : "/Category/",
};
export const TAGS = "/tag/";

export const RECIPES_URLS = {
  RECIPES_LIST :  `/Recipe/`,
  RECIPE : (id)=> `/Recipe/${id}`,
  ADD_RECIPE : "/Recipe/",
};
export const USERS_URLS = {
  USERS_LIST :  `/Users/`,
  USERS : (id)=> `/Users/${id}`,
  CURRENT_USER :  `/Users/currentUser/`,

  // ADD_USER : "/Users/",
};
export const FAVORITES_URLS = {
  FAVORITE :  `/userRecipe/`,
  DELETE_FAV : (id)=> `/userRecipe/${id}`,
};


