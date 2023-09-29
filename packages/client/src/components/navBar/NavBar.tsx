import "./navBar.scss";
import { DarkMode, LightMode } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { DarkModeContext } from "../../context/darkMode";
import { useCtx } from "../../hooks/useCtx";

export default function NavBar() {
  const { darkMode, toggleDarkMode } = useCtx(DarkModeContext);

  return (
    <div id="navbar">
      <div className="center">
        <h1>WSA Service</h1>
        <span>Simple Web Scraper Demo</span>
      </div>
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
        <div id="repo-url">
          <a href="https://www.github.com/cuaies/wsa-service">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
