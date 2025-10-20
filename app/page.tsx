"use client";

import { useState } from "react";
import Search from "@/components/Header/Search";
import Map from "@/components/Map/Map";

export default function HomePage() {
  const [location, setLocation] = useState<string | undefined>();
  const [latlin, setLatlin] = useState<[number, number]>();

  return (
    <>
      <Search
        location={location}
        setLocation={setLocation}
        setLatlin={setLatlin}
        latlin={latlin}
      />
      <Map location={location} latlin={latlin} />
    </>
  );
}
