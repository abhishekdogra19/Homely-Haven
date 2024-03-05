import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    //! link is different from the video
    try {
      await toast.promise(
        axios.post("/user/register", {
          name,
          email,
          password,
        }),
        {
          error: "Network Error",
          success: "Successfully User Created",
          pending: "User Creating...",
        }
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("Something Went Wrong !!");
      console.log(error);
    }
  };
  return (
    //! added  flex-col for toast
    <div className="mt-4 grow flex flex-col items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4 font-semibold uppercase ">
          Register
        </h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegisterUser}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary" onClick={() => {}}>
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
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

export default RegisterPage;
