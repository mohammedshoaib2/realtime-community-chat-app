import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout() {
  let isSessionAvailable = useSelector((state) => {
    return state.authSlice.isLoggedIn;
  });
  return (
    <div className="w-full h-full bg-black flex ">
      <div className="flex-1 flex w-full h-full justify-center items-center">
        {!isSessionAvailable ? <Outlet /> : <Navigate to="/" />}
      </div>
      <div className="flex-1 min-[100px]:max-[1000px]:hidden">
        <img className="h-full w-full object-cover" src="/bg.png" alt="bg" />
      </div>
    </div>
  );
}

export default AuthLayout;
