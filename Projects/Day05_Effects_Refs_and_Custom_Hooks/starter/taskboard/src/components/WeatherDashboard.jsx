import { useState, useEffect } from "react"

function WeatherDashboard() {
  const [city, setCity] = useState("Pretoria")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        // free API, no key - wttr.in
        const res = await fetch(`https://wttr.in/${city}?format=j1`)
        const data = await res.json()
        const cur = data.current_condition[0]
        setWeather({
          temp: cur.temp_C,
          desc: cur.weatherDesc[0].value,
          humidity: cur.humidity
        })
      } catch {
        setWeather({ temp: "24", desc: "Sunny (mock - offline)", humidity: "40" })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [city])

  return (
    <div>
      <h3>Weather Dashboard - Lab 5.2</h3>
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
        style={{ padding: "6px" }}
      />
      {loading? <p>Loading weather for {city}...</p> : null}
      {weather &&!loading && (
        <div style={{ marginTop: "10px" }}>
          <p><b>{city}</b>: {weather.temp}°C - {weather.desc}</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  )
}

export default WeatherDashboard