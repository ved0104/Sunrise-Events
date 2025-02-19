import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

function MyComponent() {
  const map = useMap(); // Now correctly placed inside MapContainer context
  
  return null;
}

function MyMapComponent() {
  return (
    <MapContainer center={[21.1410, 72.7725]} zoom={13} style={{ height: "200px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent />
    </MapContainer>
  );
}

const StoreLocation = () => {
    return (
      <div className="mt-6 w-full flex justify-center">
        <div className="w-full max-w-md h-[200px] border border-gray-400 rounded-lg overflow-hidden">
          <MyMapComponent />
        </div>
      </div>
    );
  };

export default StoreLocation;
