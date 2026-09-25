import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { DevTools } from "./components/DevTools.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    // Poll every 3 s so you can watch the 10 s access token expire and refresh.
    queries: { staleTime: 0, refetchInterval: 3_000, retry: false },
  },
});

// Start the fake API (a service worker) before the app makes any requests.
// It is a teaching app, so the mock runs in production builds too (`npm run preview`).
const { worker } = await import("./mocks/browser.ts");
await worker.start({ onUnhandledRequest: "bypass" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <DevTools />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
