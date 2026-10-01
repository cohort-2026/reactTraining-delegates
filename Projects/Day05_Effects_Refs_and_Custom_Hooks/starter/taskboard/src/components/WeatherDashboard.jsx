import { useState } from "react";
import { useFetch } from "../hooks/useFetch.js";

const cities = [
  { name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
  { name: "Durban", lat: -29.8587, lon: 31.0218 },
  { name: "London", lat: 51.5072, lon: -0.1276 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
];

function WeatherDashboard() {
  const [cityName, setCityName] = useState(cities[0].name);
  const city = cities.find((c) => c.name === cityName);

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const { data, error, loading } = useFetch(url);

  return (
    <section className="weather">
      <h2>Lab 5.2 Weather</h2>
      <label htmlFor="city">City </label>
      <select id="city" value={cityName} onChange={(e) => setCityName(e.target.value)}>
        {cities.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>

      {loading && <p>Loading weather...</p>}
      {error && <p role="alert">Could not load weather: {error}</p>}
      {data && (
        <div>
          <p>
            Now in {cityName}: {data.current.temperature_2m}
            {data.current_units.temperature_2m}, humidity {data.current.relative_humidity_2m}%,
            wind {data.current.wind_speed_10m} {data.current_units.wind_speed_10m}
          </p>
          <ul>
            {data.daily.time.map((day, i) => (
              <li key={day}>
                {day}: {data.daily.temperature_2m_min[i]}° to {data.daily.temperature_2m_max[i]}°
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default WeatherDashboard;