import { useState } from "react";
import useFetch from "../hooks/useFetch";
import cities from "../data/cities";

/**
 * WeatherDashboard
 * Pick a city → fetch current weather from Open-Meteo.
 * Uses the useFetch custom hook for all the fetch/loading/error logic.
 */
function WeatherDashboard() {
  const [cityId, setCityId] = useState(cities[0].id);

  const city = cities.find((c) => c.id === cityId);

  // Build the weather URL. Open-Meteo returns current temperature
  // (2m above ground) and windspeed (10m above ground).
  const url = city
    ? `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,wind_speed_10m`
    : null;

  const { data, status, error } = useFetch(url);

  return (
    <section className="mx-auto mt-12 max-w-4xl px-6">
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Lab 5.2
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Weather dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Pick a city to see its current weather.
        </p>
      </header>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">
          City
        </span>
        <select
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/20"
        >
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {status === "loading" && (
          <p className="text-sm text-gray-500">Loading weather…</p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600">Error: {error}</p>
        )}

        {status === "success" && data?.current && (
          <div>
            <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Temperature
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {data.current.temperature_2m}°C
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Wind speed
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {data.current.wind_speed_10m} km/h
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Data from{" "}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="underline hover:text-gray-700"
              >
                Open-Meteo
              </a>
            </p>
          </div>
        )}

        {status === "idle" && (
          <p className="text-sm text-gray-500">
            Pick a city to see the weather.
          </p>
        )}
      </div>
    </section>
  );
}

export default WeatherDashboard;