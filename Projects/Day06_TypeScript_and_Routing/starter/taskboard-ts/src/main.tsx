// TODO (Lab 6.1): keep the template's main.tsx, which has the ! after getElementById("root").
// TODO (Lab 6.2 step 3): define the routes with createBrowserRouter and render <RouterProvider> from "react-router/dom".
// TODO (Lab 6.3 steps 3-4): add a login route and wrap the settings route in <RequireAuth>.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
