import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressLink from "../Components/AddressLink";
import PlaceGallery from "../Components/PlaceGallery";
import BookingWidget from "../Components/BookingWidget";

interface placeObj {
  title: string;
  address: string;
  description: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  extraInfo: string;
  photos: string[];
  price: number;
}
const PlacePage: React.FC = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<placeObj>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    const fetchPlaceById = async () => {
      try {
        const response = await axios.get(`/place/getPlaceById/${id}`);
        setPlace(response.data[0]);
      } catch (error) {
        console.log("Error in Place Page, ", error);
        navigate("/");
      }
    };
    fetchPlaceById();
  }, [id, navigate]);
  if (!place) return "";
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-4">
      <h1 className="text-2xl">{place?.title}</h1>
      <AddressLink>{place?.address}</AddressLink>
      <PlaceGallery {...place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place?.description}
          </div>
          CheckIn: {place?.checkIn} <br />
          CheckOut: {place?.checkOut} <br />
          MaxGuests: {place?.maxGuests}
        </div>
        <div>
          <BookingWidget {...place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place?.extraInfo}
        </div>
      </div>
    </div>
  );
};
// !Just got it from github, currently not working we will make it work tomorrow  Peace!!!

export default PlacePage;
