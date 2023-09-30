import "./fallbackLoader.scss";

const FallbackLoader = () => {
  return (
    <div id="fallback-container">
      <div className="loader-container">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
    </div>
  );
};

export default FallbackLoader;
