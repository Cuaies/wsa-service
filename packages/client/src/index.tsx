import "./index.scss";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkMode";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </StrictMode>
);
