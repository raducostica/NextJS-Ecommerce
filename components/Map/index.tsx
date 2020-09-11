import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "./Pin";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFkeiIsImEiOiJjazI3bDhodGYxcnA3M2xtendlanc4bHd3In0.B6Ae9XjzePX6d3zyW2aWog";

type LocationProps = {
  longitude: number;
  latitude: number;
};

type MapProp = {
  locations: LocationProps[];
};

const Map = ({ locations }: MapProp) => {
  const [viewport, setViewport] = useState({
    width: 652,
    height: 596,
    latitude: 53.33306,
    longitude: -6.24889,
    zoom: 11,
  });

  // const arr = [
  //   { longitude: 53.34399, latitude: -25.31714 },
  //   { longitude: 53.3111, latitude: -16.28417 },
  //   { longitude: 53.3112, latitude: -10.2512 },
  // ];

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(newViewport) => setViewport(newViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="https://api.maptiler.com/maps/51896624-22c9-466c-a329-a94c71f30a0d/style.json?key=94POrAmV6YVyhXBXGw8R"
    >
      {locations &&
        locations.map(
          (
            location: { longitude: number; latitude: number },
            index: number
          ) => {
            return (
              <Marker
                key={index}
                longitude={location.longitude}
                latitude={location.latitude}
              >
                <Pin />
              </Marker>
            );
          }
        )}
    </ReactMapGL>
  );
};

export default Map;
