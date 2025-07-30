import { AddressForm } from "./form";

import React, { Suspense } from "react";
import { coordinates, getResturants } from "../utils/hooks";
import { Map } from "./map";

export type ResturantType = {
  place_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  formatted: string;
};
export type CoordinatesType = {
  lat: number;
  lng: number;
};

export default function Home() {
  async function resturantResults(address: string): Promise<ResturantType[]> {
    "use server";
    return await getResturants(address);
  }

  async function getCoordinates(address: string): Promise<CoordinatesType> {
    "use server";
    return await coordinates(address);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-18">
      <div className="card flex flex-col mb-10">
        <header className="bg-blue-500 p-4 text-white">
          <h1 className="text-2xl font-semibold text-center">QuickRide</h1>
        </header>
        <div className=" mt-5 flex flex-col">
          <h1 className="text-xl font-bold text-center">
            What restaurants can I bike to in 15 minutes?
          </h1>
        </div>
      </div>
      <div className="flex align-top">
        <Suspense fallback={<div>Loading....</div>}>
          <AddressForm
            getCoordinates={getCoordinates}
            getResturants={resturantResults}
          />
        
        <Map />
        </Suspense>
      </div>
    </main>
  );
}
