import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../Components/AddressLink";
import BookingDates from "../Components/BookingDates";
import PlaceGallery from "../Components/PlaceGallery";
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

interface bookingObj {
  _id: string;
  place: placeObj;
  user: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  extraInfo: string;
  photos: string[];
  price: number;
}
const BookingPage: React.FC = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<bookingObj>();
  console.log("booking", booking);
  useEffect(() => {
    if (bookingId) {
      const fetchBookingData = async () => {
        try {
          const response = await axios.get("/user/bookings");
          const foundBooking = response.data.find(
            (singleBooking: { _id: string }) => singleBooking._id === bookingId
          );
          console.log("response", response);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        } catch (error) {
          console.log("error in single booking page", error);
          throw error;
        }
      };
      fetchBookingData();
    }
  }, [bookingId]);
  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Info: </h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-4 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-3xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery {...booking.place} />
    </div>
  );
};

export default BookingPage;
