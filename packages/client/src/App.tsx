import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context/darkMode";
import { useCtx } from "./hooks/useCtx";
import Landing from "./pages/Landing/Landing";
import { lazy } from "react";

const ErrorLayout = lazy(() => import("./pages/layouts/error/errorLayout"));

function App() {
  const { darkMode } = useCtx(DarkModeContext);

  return (
    <BrowserRouter>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Routes>
          <Route index element={<Landing />}></Route>
          <Route path="*" element={<ErrorLayout code="404" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
