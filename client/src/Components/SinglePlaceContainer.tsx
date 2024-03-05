import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
interface SinglePlaceContainerProps {
  place: placeObject;
}
const SinglePlaceContainer: React.FC<SinglePlaceContainerProps> = ({
  place,
}) => {
  const { _id, title, description, photos } = place;
  const navigate = useNavigate();
  const handleEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/account/place/edit/${_id}`);
  };
  return (
    <div className="bg-gray-100 p-4 mt-4">
      <Link to={`/place/${_id}`} className="flex gap-4 ">
        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
          <img
            src={`http://localhost:8000/uploads/${photos[0]}`}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="w-full">
          <h2 className="text-xl">{title}</h2>
          <p className="text-sm mt-2">{description}</p>
        </div>
      </Link>
      <div className="flex justify-end">
        <button
          onClick={(e) => handleEditButton(e)}
          className="bg-primary text-white px-4 py-2 rounded-xl mt-8  z"
        >
          Edit Place Details
        </button>
      </div>
    </div>
  );
};
// ! left here have to go to market to buy some stuff as i am going to jammu tommorrow
//# will continue it after some time today
export default SinglePlaceContainer;
