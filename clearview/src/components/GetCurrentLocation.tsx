import { createContext, useState, useEffect } from "react";
import Axios from "axios";

type LocationContextType = {
  location: string;
  setCurrentLocation: (location: string) => void;
};
export const LocationContext = createContext<LocationContextType>({
  location: "",
  setCurrentLocation: () => {},
});
// export const LocationContext = createContext("");

const LocationProvider = (props: any) => {
  const [location, setLocation] = useState("");
  const setCurrentLocation = (location: string) => {
    setLocation(location);
  };

  useEffect(() => {
    //this api will provide current location
    //latitde , longitude,country, city
    const url = "http://ip-api.com/json";

    Axios.get(url)
      .then(function (res) {
        const { city, country } = res.data;
        setLocation(`${city}, ${country}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // console.log(location);
  return (
    <>
      <h1>{location}</h1>
      <LocationContext.Provider value={{ location, setCurrentLocation }}>
        {props.children}
      </LocationContext.Provider>
    </>
  );
};
export default LocationProvider;
