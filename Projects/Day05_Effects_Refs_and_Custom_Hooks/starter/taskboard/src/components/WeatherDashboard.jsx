import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";

const cities = {
  Johannesburg: {
    latitude: -26.2041,
    longitude: 28.0473,
  },
  CapeTown: {
    latitude: -33.9249,
    longitude: 18.4241,
  },
  Durban: {
    latitude: -29.8587,
    longitude: 31.0218,
  },
};

function WeatherDashboard() {
  const [city, setCity] = useState("Johannesburg");

  const url = useMemo(() => {
    const { latitude, longitude } = cities[city];

    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
  }, [city]);

  const { data, loading, error } = useFetch(url);

  return (
    <div>
      <h2>Weather Dashboard</h2>

      <label htmlFor="city">Choose a city:</label>

      <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
        {Object.keys(cities).map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      {loading && <p>Loading weather...</p>}

      {error && <p>Could not load weather: {error}</p>}

      {data?.current && (
        <div>
          <p>Temperature: {data.current.temperature_2m} °C</p>
          <p>Wind speed: {data.current.wind_speed_10m} km/h</p>
          <p>Last updated: {data.current.time}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
