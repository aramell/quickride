import "server-only";

type ResturantListResponse = {
  place_id: string;
  name: string;
  address_line2: string;
  lat: string;
  lon: string;
  formatted: string;
};
const findResturants = (coords: any) => {
  return fetch(
    `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=geometry:ea6c481cacabeff6dc593858486e2b8f&bias=proximity:${coords.lng},${coords.lat}&limit=20&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
  );
};

const coordinates = async (address: any) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch coordinates. Please try again!");
  }

  const json = await res.json();
  return json.results[0].geometry.location;
};

const getResturants = async (address: FormDataEntryValue) => {
  "use server";
  const coords = await coordinates(address);
  let resturantsList = await (await findResturants(coords)).json();
  const resturants = resturantsList.features.map(
    (resturant: {
      properties: ResturantListResponse;
      geometry: { coordinates: { lat: string; lng: string } };
    }) => {
      return {
        id: resturant.properties.place_id,
        name: resturant.properties.name,
        address: resturant.properties.address_line2,
        lat: resturant.properties.lat,
        lon: resturant.properties.lon,
        formatted: resturant.properties.formatted,
      };
    }
  );
  return resturants;
};

export { getResturants, coordinates };
