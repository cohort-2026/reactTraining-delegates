# TaskBoard: Lab 5.2 solution (Weather Dashboard)

TaskBoard after **Lab 5.2: Weather Dashboard from a Public API**. A reusable `useFetch` custom Hook powers a small weather dashboard with a city selector, using the free Open-Meteo API (no key needed).

Built on: `../lab-5.1-search-debounce`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). You need an internet connection for the weather data. `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- New `src/hooks/useFetch.js`: returns `{ data, error, loading }`, re-fetches when `url` changes, cancels the old request with `AbortController`, only switches `loading` off when the request was not aborted, and sets `loading` back to `true` in the cleanup.
- New `src/components/WeatherDashboard.jsx`: a `<select>` of Johannesburg, Cape Town and Durban. The selected city is derived from `cityName`, the Open-Meteo URL is built as a plain string, and the dashboard shows the current temperature, wind speed and last updated time (`current.time`), with loading and error states.
- `src/App.jsx` renders `WeatherDashboard` in a temporary section below the board, in place of `ProductSearch` (its file stays).

## Done when

- Changing the city updates the data
- `useFetch` is reused, not copied
- There are no console errors or warnings
