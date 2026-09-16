// TODO (Lab 6.1): practice code from an earlier lab that App no longer renders. Leave it out of taskboard-ts.
import { useState } from "react";
import { useFetch } from "../hooks/useFetch.js";

const cities = [
  { name: "Johannesburg", lat: -26.2, lon: 28.05 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Durban", lat: -29.86, lon: 31.02 },
];

function WeatherDashboard() {
  const [cityName, setCityName] = useState(cities[0].name);
  const city = cities.find((c) => c.name === cityName); // derived, not state

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${city.lat}&longitude=${city.lon}` +
    "&current=temperature_2m,wind_speed_10m&timezone=auto";
  const { data, loading, error } = useFetch(url);

  let content;
  if (loading) content = <p>Loading weather...</p>;
  else if (error) content = <p role="alert">Could not load the weather: {error}</p>;
  else
    content = (
      <div>
        <p>Temperature: {data.current.temperature_2m} °C</p>
        <p>Wind speed: {data.current.wind_speed_10m} km/h</p>
        <p>Last updated: {data.current.time.replace("T", " ")}</p>
      </div>
    );

  return (
    <section>
      <h2>Weather in {city.name}</h2>
      <label htmlFor="city">City </label>
      <select id="city" value={cityName} onChange={(e) => setCityName(e.target.value)}>
        {cities.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
      {content}
    </section>
  );
}

export default WeatherDashboard;
