import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { format } from "date-fns/format";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface placeObj {
  _id?: string;
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
interface bookinObj {
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
const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<bookinObj[]>([]);
  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const response = await axios.get("/user/bookings");
        setBookings(response.data);
      } catch (error) {
        console.log("Error fetching bookings ", error);
        throw error;
      }
    };
    fetchMyBookings();
  }, []);
  const getPhoto = (photoLink: string) => {
    let imgAddress = "";
    if (photoLink.startsWith("http")) {
      return photoLink;
    }
    imgAddress += `http://localhost:8000/uploads/${photoLink}`;
    return imgAddress;
  };
  return (
    <div>
      {bookings?.length > 0 ? (
        bookings.map((booking) => (
          <Link
            to={`/account/bookings/${booking._id}`}
            key={booking._id}
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-10 h-40"
          >
            <div className="w-48">
              {booking.place.photos?.length > 0 && (
                <img
                  className="h-full w-full object-cover"
                  src={getPhoto(booking.place.photos[0])}
                />
              )}
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{booking.place.title}</h2>
              <div className="flex gap-1 items-center border-t border-gray-300 mt-4 py-2"></div>
              <div className="text-xl">
                <div className=" flex gap-1 mb-2 mt-4 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  nights:
                  <div className="flex gap-1 items-center ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                  </div>
                  &rarr;
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                  </div>
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-2xl">
                    Total Price: ₹{booking.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingsPage;
