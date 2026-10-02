# TaskBoard: Lab 5.2 solution (Weather Dashboard)

Built on: `../lab-5.1-search-debounce`.

This checkpoint carries forward the interactive TaskBoard and debounced search, and adds a city-selectable Open-Meteo dashboard.

## How to run

```bash
npm install
npm run dev
```

The search and weather exercises need an internet connection. Run `npm run lint` and `npm run build` to check the project.

## What changed

- Added reusable `useFetch(url)` with data, loading, error and abort handling.
- Added Johannesburg, Cape Town and Durban as selectable locations.
- Displays temperature, wind speed and the API response timestamp.
- Changing city triggers a new request and cancels the previous one.

The next checkpoint builds on this one and adds persisted tasks and API seed data.