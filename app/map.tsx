"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useSearchParams } from "next/navigation";

const Map = () => {
  const searchparams = useSearchParams();
  const coordinates = {
    lat: Number(searchparams.get("lat")),
    lng: Number(searchparams.get("lng")),
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  if (!isLoaded || (!coordinates.lat && !coordinates.lng)) return null;
  if (isLoaded)
    return (
      <div className="ml-10">
        <GoogleMap
          zoom={15}
          center={coordinates}
          mapContainerStyle={{ width: "400px", height: "400px" }}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </div>
    );
};

export { Map };
