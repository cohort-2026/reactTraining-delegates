import { useState } from 'react';
import useFetch from '../hooks/useFetch.js';

const CITIES = [
  { name: 'Johannesburg', lat: -26.2041, lon: 28.0473 },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
  { name: 'Durban', lat: -29.8587, lon: 31.0218 },
  { name: 'London', lat: 51.5072, lon: -0.1276 },
];

function WeatherDashboard() {
  const [cityName, setCityName] = useState(CITIES[0].name);
  const city = CITIES.find((c) => c.name === cityName);

  const { data, loading, error } = useFetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,wind_speed_10m`
  );

  return (
    <section>
      <h2>Weather Dashboard</h2>
      <select value={cityName} onChange={(e) => setCityName(e.target.value)}>
        {CITIES.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong. Try again.</p>}
      {!loading && !error && data && (
        <ul>
          <li>
            Temperature: {data.current.temperature_2m}
            {data.current_units.temperature_2m}
          </li>
          <li>
            Wind: {data.current.wind_speed_10m}{' '}
            {data.current_units.wind_speed_10m}
          </li>
        </ul>
      )}
    </section>
  );
}

export default WeatherDashboard;