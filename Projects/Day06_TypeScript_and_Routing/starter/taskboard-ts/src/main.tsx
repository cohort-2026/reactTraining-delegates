// TODO (Lab 6.1): keep the template's main.tsx, which has the ! after getElementById("root").
// TODO (Lab 6.2 step 3): define the routes with createBrowserRouter and render <RouterProvider> from "react-router/dom".
// TODO (Lab 6.3 steps 3-4): add a login route and wrap the settings route in <RequireAuth>.
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { AuthProvider } from "./hooks/useAuth"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)