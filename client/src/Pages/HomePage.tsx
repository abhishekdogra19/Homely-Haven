import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface placeObject {
  _id: string;
  photos: string[];
  address: string;
  price: number;
  title: string;
}
const HomePage: React.FC = () => {
  const [places, setPlaces] = useState<placeObject[]>([]);
  useEffect(() => {
    const fetchAllPlaces = async () => {
      const response = await axios.get("/place/getAllPlaces");
      setPlaces(response.data);
    };
    fetchAllPlaces();
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:8000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">₹{place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default HomePage;
