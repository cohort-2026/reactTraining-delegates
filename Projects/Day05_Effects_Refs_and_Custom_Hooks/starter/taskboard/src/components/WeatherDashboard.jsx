import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const CITIES = [
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

export default function WeatherDashboard() {
  const [cityIndex, setCityIndex] = useState(0);
  const city = CITIES[cityIndex];

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}` +
    `&current=temperature_2m,wind_speed_10m,relative_humidity_2m` +
    `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const { data, loading, error } = useFetch(url);

  return (
    <section>
      <h2>Weather Dashboard</h2>
      <select
        value={cityIndex}
        onChange={(e) => setCityIndex(Number(e.target.value))}
      >
        {CITIES.map((c, i) => (
          <option key={c.name} value={i}>
            {c.name}
          </option>
        ))}
      </select>

      {loading && <p>Loading weather...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {data && !loading && (
        <div>
          <h3>{city.name} now</h3>
          <p>Temperature: {data.current.temperature_2m}°C</p>
          <p>Wind: {data.current.wind_speed_10m} km/h</p>
          <p>Humidity: {data.current.relative_humidity_2m}%</p>

          <h3>7-day forecast</h3>
          <ul>
            {data.daily.time.map((day, i) => (
              <li key={day}>
                {day}: {data.daily.temperature_2m_min[i]}° to{" "}
                {data.daily.temperature_2m_max[i]}°
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}