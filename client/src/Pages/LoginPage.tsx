import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUserContext } from "../context/userContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>();
  const navigate = useNavigate();
  const UserContext = useUserContext();

  const [errorMsg, setErrorMsg] = useState<string>();
  const handleLoginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    //! link is different from the video
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      const userInfo = response?.data?.user;
      setTimeout(() => {
        UserContext?.setUser(userInfo);
        setRedirect(true);
      }, 1000);
      toast.success("User Logged in");
    } catch (err) {
      setRedirect(false);
      // ! check it tommorow
      setErrorMsg((err as Error).message);
      console.log(err);
    }
  };
  useEffect(() => {
    if (UserContext?.user) {
      setRedirect(true);
    }
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate, UserContext?.user]);
  console.log(errorMsg);
  return (
    //! added  flex-col for toast
    <div className="mt-4 grow flex flex-col items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4 font-semibold uppercase">
          Login
        </h1>
        <p className="text-red-600 font-bold text-center">
          {errorMsg && errorMsg}
        </p>
        <form className="max-w-md mx-auto" onSubmit={handleLoginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginPage;
