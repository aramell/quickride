"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ResturantList } from "./resturantList";
import { ResturantType, CoordinatesType } from "./page";

const AddressForm = ({
  getCoordinates,
  getResturants,
}: {
  getCoordinates: (query: string) => Promise<CoordinatesType>;
  getResturants: (query: string) => Promise<ResturantType[]>;
}) => {
  const [resturantResults, setResturantResults] = useState<
    ResturantType[] | []
  >([]);

  const router = useRouter();

  const { lat, lng } = useParams();

  const coordindates = {
    lat: Number(lat),
    lng: Number(lng),
  };

  const handleResturantSearch = async (address: string) => {
    const { lat, lng } = await getCoordinates(address);
    const resturants = await getResturants(address as string);
    setResturantResults(resturants);
    router.push(`/?lat=${lat}&lng=${lng}&address=${address}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const address = e.currentTarget.address.value;
    handleResturantSearch(address);
  };

  return (
    <div className="card flex flex-row items-center justify-center ">
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit}>
          <>
            <label htmlFor="address" className="">
              Enter an address:
            </label>
            <div className="flex items-center justify-center">
              <input
                className="px-4 py-2 border rounded-md w-full"
                type="text"
                id="address"
                placeholder="address, city, state, zip"
              />
              <button
                type="submit"
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Go
              </button>
            </div>
          </>
        </form>
        <div className="flex items-center mt-4">
          <ResturantList resturants={resturantResults} />
        </div>
      </div>
    </div>
  );
};

export { AddressForm };
