import React, { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PlacesPage from "./PlacesPage";
import BookingsPage from "./BookingsPage";

const AccountPage: React.FC = () => {
  const UserContext = useUserContext();
  const navigate = useNavigate();
  let { subPage } = useParams();
  if (!subPage) {
    subPage = "profile";
  }
  useEffect(() => {
    if (!UserContext?.ready) {
      // Loading state, do nothing
    } else if (UserContext.ready && !UserContext.user) {
      // If user is not logged in, navigate to the login page
      navigate("/login");
    }
  }, [UserContext, navigate]);

  if (!UserContext?.ready) {
    return <h3>Loading...</h3>;
  }

  const logout = async () => {
    try {
      await toast.promise(axios.post("/user/logout"), {
        error: "Network Error",
        success: "Successfully logged out",
        pending: "Logging out",
      });
      setTimeout(() => {
        UserContext?.setUser(null);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const linkClass = (type: string) => {
    let linkstyle = "inline-flex gap-1 py-2 px-6 duration-300 ";
    if (subPage == type) {
      linkstyle += "bg-primary text-white rounded-full";
    }
    return linkstyle;
  };

  return (
    <div>
      <nav className="flex w-full justify-center mt-8 gap-4 mb-8 ">
        <Link to={"/account"} className={linkClass("profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Profile
        </Link>
        <Link to={"/account/bookings"} className={linkClass("bookings")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
          My Bookings
        </Link>
        <Link to={"/account/places"} className={linkClass("places")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
            />
          </svg>
          My Accommodations
        </Link>
      </nav>
      {subPage == "profile" && (
        <div className="max-w-lg mx-auto text-center">
          <p>
            Logged in as {UserContext.user?.name} ({UserContext.user?.email})
          </p>
          <button
            onClick={logout}
            className="primary text-white max-w-sm  mt-2"
          >
            Logout
          </button>
        </div>
      )}

      {subPage == "places" && <PlacesPage />}
      {subPage == "bookings" && <BookingsPage />}
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

export default AccountPage;
