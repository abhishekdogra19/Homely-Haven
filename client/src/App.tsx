import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import SharedLayout from "./Components/SharedLayout";
import axios from "axios";
import AccountPage from "./Pages/AccountPage";
import PlaceFormPage from "./Pages/PlaceFormPage";
import NotFoundPage from "./Pages/NotFoundPage";
import PlacePage from "./Pages/PlacePage";
import BookingPage from "./Pages/BookingPage";
import PlacesPage from "./Pages/PlacesPage";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/account/:subPage?" element={<AccountPage />} />
        <Route path="/account/:subPage/:action" element={<AccountPage />} />
        <Route path="/account/places/:action" element={<PlacesPage />} />
        <Route path="/account/place/edit/:id" element={<PlaceFormPage />} />
        <Route path="/account/bookings/:bookingId" element={<BookingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
