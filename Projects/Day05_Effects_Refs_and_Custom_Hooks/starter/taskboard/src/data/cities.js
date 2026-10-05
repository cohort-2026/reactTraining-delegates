/**
 * Sample cities for the weather dashboard.
 * Each has a name and coordinates. Open-Meteo can also do city-name
 * geocoding, but hardcoding makes the lab simpler and instant.
 */
const cities = [
  { id: "jhb", name: "Johannesburg", latitude: -26.2041, longitude: 28.0473 },
  { id: "cpt", name: "Cape Town",    latitude: -33.9249, longitude: 18.4241 },
  { id: "dbn", name: "Durban",       latitude: -29.8587, longitude: 31.0218 },
  { id: "lon", name: "London",       latitude:  51.5074, longitude: -0.1278 },
  { id: "nyc", name: "New York",     latitude:  40.7128, longitude: -74.0060 },
  { id: "tok", name: "Tokyo",        latitude:  35.6762, longitude: 139.6503 },
];

export default cities;