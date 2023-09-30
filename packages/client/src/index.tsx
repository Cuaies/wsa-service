import "./index.scss";
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkMode";
import FallbackLoader from "./components/fallbackLoader/FallbackLoader";
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Suspense>
      <ErrorBoundary FallbackComponent={FallbackLoader}>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </ErrorBoundary>
    </Suspense>
  </StrictMode>
);
