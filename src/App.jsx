import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import LoginForm from "./_auth/LoginForm";
import SignupForm from "./_auth/SignupForm";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/Home";
import { authService } from "../appwrite/AuthService/AuthService";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      dispatch(login(user));
    } catch (error) {
      dispatch(logout());
      console.log("error occured", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return !isLoading ? (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signin" element={<SignupForm />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  ) : (
    <div className="h-full w-full bg-Cgray flex justify-center items-center text-white">
      Loading...
    </div>
  );
};

export default App;
