import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlaceFormPage from "./PlaceFormPage";
import axios from "axios";
import SinglePlaceContainer from "../Components/SinglePlaceContainer";
interface placeObject {
  _id: string;
  title: string;
  address: string;
  checkIn: number;
  checkOut: number;
  description: string;
  extraInfo: string;
  maxGuests: number;
  perks: string[];
  photos: string[];
  price: number;
}
const PlacesPage: React.FC = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState<placeObject[]>([]);
  useEffect(() => {
    const fetchAllPlaces = async () => {
      const { data } = await axios.get("/place/getAllUserPlaces");
      setPlaces(data);
    };
    fetchAllPlaces();
  }, [action]);
  console.log("action ", action);
  console.log("params ", useParams());
  return (
    <div>
      {action === "new" && <PlaceFormPage />}
      {action !== "new" && (
        <>
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-primary text-white px-6 py-2 rounded-full"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add New Place
            </Link>
          </div>
          {places?.map((place) => (
            <SinglePlaceContainer key={place?._id} place={place} />
          ))}
        </>
      )}
    </div>
  );
};

export default PlacesPage;
