import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

function WeatherDashboard() {
  const cities = [
    { name: "Durban", lat: -29.85, lon: 31.02 },
    { name: "Johannesburg", lat: -26.20, lon: 28.04 },
    { name: "Cape Town", lat: -33.92, lon: 18.42 }
  ];

  const [city, setCity] = useState(cities[0]);

  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + city.lat + "&longitude=" + city.lon + "&current=temperature_2m,wind_speed_10m";

  const { data, loading, error } = useFetch(url);

  function handleChange(e) {
    const found = cities.find(function(c) {
      return c.name === e.target.value;
    });
    setCity(found);
  }

  return (
    <div>
      <h2>Weather Dashboard</h2>

      <select value={city.name} onChange={handleChange}>
        <option value="Durban">Durban</option>
        <option value="Johannesburg">Johannesburg</option>
        <option value="Cape Town">Cape Town</option>
      </select>

      <p>City: {city.name}</p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && data.current && (
        <div>
          <p>Temperature: {data.current.temperature_2m} C</p>
          <p>Wind: {data.current.wind_speed_10m} km/h</p>
          <p>Last updated: {data.current.time}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;