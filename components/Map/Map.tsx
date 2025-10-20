"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import IconArrow from "/public/images/icon-location.svg";

interface Props {
  location: string | undefined;
  latlin: [number, number] | undefined;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.flyTo(center);
  return null;
}

export default function Map({ location, latlin }: Props) {
  if (!latlin) return null;

  return (
    <MapContainer
      center={latlin}
      zoom={13}
      scrollWheelZoom={true}
      className="z-0"
    >
      <ChangeView center={latlin} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={latlin}
        icon={L.icon({
          iconUrl: IconArrow.src,
        })}
      >
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
}
