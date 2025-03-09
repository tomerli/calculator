import React from "react";
import "./Screen.css";

const Screen = ({ value, error, history }) => {
  return (
    <div className="display-section">
      <div 
        className={`screen ${error ? 'error' : ''}`}
        role="textbox"
        aria-label="Calculator Display"
        aria-live="polite"
      >
        <div className={error ? 'error-message' : 'screen-content'} aria-atomic="true">
          {error || value}
        </div>
      </div>
      <div className="history" role="log" aria-label="Calculation History">
        {history?.map((entry, index) => (
          <div key={index} className="history-entry">{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default Screen;
