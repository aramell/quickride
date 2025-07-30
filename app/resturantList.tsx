"use client";
import React from "react";
import { ResturantType } from "./page";

const ResturantList = ({ resturants }: { resturants: ResturantType[] }) => {
  return (
    resturants.length > 0 && (
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Places Nearby:</h2>
        <ul className="mt-2 hover: cursor-pointer ">
          {resturants.map((place: ResturantType, index: number) => (
            <li
              key={index}
              className="mb-2 p-2 border-2 border-gray-500 hover:bg-gray-200 max-w-lg rounded-md" 
            >
              <div>{place.name} </div>
              <div>{place.address}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export { ResturantList };
