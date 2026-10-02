import { useState } from "react";
import { useFetch } from "../hooks/useFetch.js";

const cities = [
  { name: "Johannesburg", latitude: -26.2, longitude: 28.05 },
  { name: "Cape Town", latitude: -33.92, longitude: 18.42 },
  { name: "Durban", latitude: -29.86, longitude: 31.02 },
];

function WeatherDashboard() {
  const [cityName, setCityName] = useState(cities[0].name);
  const city = cities.find((item) => item.name === cityName);
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}` +
    `&longitude=${city.longitude}&current=temperature_2m,wind_speed_10m&timezone=auto`;
  const { data, loading, error } = useFetch(url);

  let content;
  if (loading) content = <p role="status">Loading weather...</p>;
  else if (error) content = <p role="alert">Could not load weather: {error}</p>;
  else if (data?.current) {
    content = (
      <div>
        <p>Temperature: {data.current.temperature_2m} °C</p>
        <p>Wind speed: {data.current.wind_speed_10m} km/h</p>
        <p>Last updated: {data.current.time.replace("T", " ")}</p>
      </div>
    );
  } else content = <p role="alert">Weather data was unavailable.</p>;

  return (
    <section className="weather-dashboard">
      <h2>Weather in {city.name}</h2>
      <label htmlFor="weather-city">City</label>
      <select
        id="weather-city"
        value={cityName}
        onChange={(event) => setCityName(event.target.value)}
      >
        {cities.map((item) => (
          <option key={item.name} value={item.name}>{item.name}</option>
        ))}
      </select>
      {content}
    </section>
  );
}

export default WeatherDashboard;