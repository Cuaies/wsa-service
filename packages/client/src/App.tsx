import { DarkModeContext } from "./context/darkMode";
import { useCtx } from "./hooks/useCtx";
import Landing from "./pages/Landing/Landing";

function App() {
  const { darkMode } = useCtx(DarkModeContext);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Landing />
    </div>
  );
}

export default App;
