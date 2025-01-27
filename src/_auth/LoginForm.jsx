import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./components/Input";
import { authService } from "../../appwrite/AuthService/AuthService";
import { useDispatch } from "react-redux";
import { login, logout } from "../../features/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const user = await authService.login(data);
      dispatch(login(user));
      navigate("/");
    } catch (error) {
      setError(true);
      setErrorMessage(String(error.message));
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full h-full">
      <div className="flex justify-center items-center gap-3">
        <img className="h-[30px] w-[30px]" src="/chat.png" alt="" />
        <p className="text-white font-bold ">Community Chat App</p>
      </div>
      <h1 className="text-white text-xl font-bold">Please Login to continue</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="min-[100px]:max-width[500px]:min-w-full  min-[501px]:min-w-[400px]   px-10 flex flex-col gap-4 justify-center items-center"
      >
        <Input
          title={"Email"}
          type={"email"}
          autoComplete="email"
          {...register("email", {
            required: true,
          })}
        />
        <Input
          title={"Password"}
          type={"password"}
          autoComplete="current-password"
          {...register("password", {
            required: true,
          })}
        />
        <button
          className="bg-Cpurple w-full py-3 px-4 rounded-md text-white cursor-pointer"
          type="submit"
        >
          {isLoading ? "Loading..." : " Login"}
        </button>

        <p className="text-white">
          Don't have an account?
          <span
            onClick={() => navigate("/signin")}
            className="text-Cpurple cursor-pointer"
          >
            {" "}
            Signin
          </span>
        </p>
        {isError && <p className="text-red-500 text-center">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
