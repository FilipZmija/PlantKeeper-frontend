import React, { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "../redux/hooks";
import { ILoginInfo, login } from "../redux/authSlice";
import { Box, TextField } from "@mui/material";
import Textfield from "./Textfield";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const [loginMode, setLoginMode] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const loginCall = useCallback(
    async (credentials: { name: string; password: string }) => {
      try {
        const response: AxiosResponse<ILoginInfo> = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/login`,
          credentials
        );
        const { accessToken, name, id } = response.data;
        dispatch(login({ accessToken, name, id }));
        localStorage.setItem("token", accessToken);
      } catch (e: any) {
        console.error(e);
        setMessage(
          e.response?.data.message || "An error occurred during login."
        );
      }
    },
    [dispatch]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginCall(credentials);
    setCredentials({
      name: "",
      password: "",
    });
  };
  const handleTry = async () => {
    await loginCall({ name: "test", password: "test" });
  };

  return (
    <div className="flex items-center justify-center h-full mx-4 mb-28">
      <div className="container flex items-center justify-center flex-col px-8 py-8 w-auto bg-light-mint shadow-md drop-shadow rounded-lg">
        {!loginMode ? (
          <>
            <h2 className="text-2xl font-bold text-dark-green">
              Hi! My name is Filip.
            </h2>
            <p className="text-md text-dark-green">This is my plant app.</p>
            <button className="btn-primary" onClick={handleTry}>
              Try me!
            </button>
            <button
              className="btn-secondary"
              onClick={() => setLoginMode(true)}
            >
              I want to use my own account
            </button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col space-y-2 m-4 sm:mx-10"
          >
            <h2 className="text-4xl font-bold text-dark-green my-2">Login</h2>
            {message && <h4 className="font-bold text-red-600"> {message}</h4>}
            <Textfield
              label="Username"
              inputProps={{
                id: "name",
                name: "name",
                type: "text",
                required: true,
                value: credentials.name,
                onChange: handleChange,
              }}
            />
            <Textfield
              label="Password"
              inputProps={{
                id: "password",
                name: "password",
                type: "password",
                required: true,
                value: credentials.password,
                onChange: handleChange,
              }}
            />

            <button type="submit" className="btn-primary w-full">
              Login
            </button>
            <a
              href="/register"
              className="btn-secondary w-full flex items-center justify-center"
            >
              <button type="button">Register</button>
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
