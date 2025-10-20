"use client";

import { useEffect, useState } from "react";
import Result from "../Result";
import axios from "axios";

interface Props {
  location: string | undefined;
  latlin: [number, number] | undefined;
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLatlin: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
}

interface ResultProps {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
  org: string;
  utc: number;
}

export default function Search({
  location,
  setLocation,
  setLatlin,
  latlin,
}: Props) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ResultProps>({
    ip: "Loading...",
    city: "Loading...",
    region: "Loading...",
    country_name: "Loading...",
    latitude: 0,
    longitude: 0,
    org: "Loading...",
    utc: 0,
  });

  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      try {
        const data = await axios.get(`https://ipapi.co/${location}/json/`);
        const data2 = await axios.get(
          `https://geo.ipify.org/api/v2/country?apiKey=at_kgpYKBEWyne3NXN5FFMzmbYL6v9bH&ipAddress=${location}`
        );
        const res = data.data;
        const timezone = data2.data.location.timezone;
        setResult({
          ip: res.ip,
          city: res.city,
          region: res.region,
          country_name: res.country_name,
          latitude: res.latitude,
          longitude: res.longitude,
          org: res.org,
          utc: timezone,
        });
        setLatlin([res.latitude, res.longitude]);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    axios.get("https://ipapi.co/json/").then((res) => {
      setLocation(res.data.ip);
      setLatlin([res.data.latitude, res.data.longitude]);
    });
  }, []);

  const findLocation = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(value);
    setValue("");
  };

  return (
    <nav className="bg-very-dark-gray text-white font-rubik bg-nav-bg bg-no-repeat bg-cover h-56 relative">
      <div className="text-center pt-6">
        <h1 className="text-3xl font-bold capitalize">IP Address Tracker</h1>
        <form onSubmit={findLocation}>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="p-3 md:w-5/12 rounded-l-md mt-4 text-black"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="bg-black h-11 py-4 pb-8 px-4 rounded-r-md hover:bg-slate-900 active:opacity-50"
            type="submit"
          >
            <img src="/images/icon-arrow.svg" alt="arrow" />
          </button>
        </form>
      </div>
      <Result
        ip={result.ip}
        city={result.city}
        region={result.region}
        country_name={result.country_name}
        org={result.org}
        utc={result.utc}
      />
    </nav>
  );
}
