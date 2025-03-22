import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedGroups }) {
  if (localStorage.getItem("token")) {
    const userRole = JSON.parse(localStorage.getItem("loginData")).userGroup;
    if (allowedGroups.includes(userRole)) {
      return children;
    } else {
      return <Navigate to={"/login"}> </Navigate>;
    }
  } else {
    return <Navigate to={"/login"}> </Navigate>;
  }
}
