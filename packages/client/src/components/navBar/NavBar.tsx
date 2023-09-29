import "./navBar.scss";
import { DarkMode, LightMode } from "@mui/icons-material";
import { DarkModeContext } from "../../context/darkMode";
import { useCtx } from "../../hooks/useCtx";

export default function NavBar() {
  const { darkMode, toggleDarkMode } = useCtx(DarkModeContext);

  return (
    <div id="navbar">
      <div className="right">
        <div id="theme-selector">
          {darkMode ? (
            <LightMode
              className="icon"
              onClick={toggleDarkMode}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <DarkMode
              className="icon"
              onClick={toggleDarkMode}
              sx={{ cursor: "pointer" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
