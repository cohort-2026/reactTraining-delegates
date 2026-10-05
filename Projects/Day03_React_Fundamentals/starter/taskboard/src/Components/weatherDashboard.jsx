import { useState } from "react";
import useFetch from "../hooks/useFetch";

const cities = [
  {
    name: "Johannesburg",
    latitude: -26.2041,
    longitude: 28.0473,
  },
  {
    name: "Cape Town",
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    name: "Durban",
    latitude: -29.8587,
    longitude: 31.0218,
  },
];

function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${selectedCity.latitude}` +
    `&longitude=${selectedCity.longitude}` +
    `&current=temperature_2m,wind_speed_10m`;

  const { data, loading, error } = useFetch(url);

  function handleCityChange(event) {
    const city = cities.find(
      (city) => city.name === event.target.value
    );

    setSelectedCity(city);
  }

  return (
    <div>
      <h2>Weather Dashboard</h2>

      <label htmlFor="city">Choose a city: </label>

      <select
        id="city"
        value={selectedCity.name}
        onChange={handleCityChange}
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      {loading && <p>Loading weather...</p>}

      {error && <p>{error}</p>}

      {data && !loading && !error && (
        <div>
          <h3>{selectedCity.name}</h3>

          <p>
            Temperature: {data.current.temperature_2m}{" "}
            {data.current_units.temperature_2m}
          </p>

          <p>
            Wind speed: {data.current.wind_speed_10m}{" "}
            {data.current_units.wind_speed_10m}
          </p>

          <p>
            Last updated:{" "}
            {new Date(data.current.time).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;