import { FC } from "react";
import "./errorLayout.scss";

/**
 * Handles the layout of the error pages.
 */
const ErrorLayout: FC<{ code: string }> = ({ code }) => {
  const statusCode = code === "404" ? "404" : "500";
  const message = code === "404" ? "Page not found" : "There's been an error";

  return (
    <div className="error-body">
      <a href="/" className="error-body-container">
        <div className="error-code">{statusCode}</div>
        <p className="error-message">{message}</p>
      </a>
    </div>
  );
};

export default ErrorLayout;
