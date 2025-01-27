import React from "react";
import Home from "./Home";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RootLayout() {
  let isSessionAvailable = useSelector((state) => {
    return state.authSlice.isLoggedIn;
  });
  return isSessionAvailable ? <Outlet /> : <Navigate to="/login" />;
}

export default RootLayout;
