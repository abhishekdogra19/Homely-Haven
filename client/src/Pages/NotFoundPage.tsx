import React from "react";
import Man404 from "../assets/Man-404-Page.gif";
import { useNavigate } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-2 pt-8">
      <div className="text-center">
        <h3 className="text-4xl font-bold">Looks like you're lost</h3>
        <p className="text-gray-600">
          The page you are looking for is not available!
        </p>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-primary text-white px-4 py-2 rounded-2xl mt-6"
        >
          Go to Home
        </button>
      </div>
      <img src={Man404} alt="Page Not Found" className="  " />
    </div>
  );
};

export default NotFoundPage;
