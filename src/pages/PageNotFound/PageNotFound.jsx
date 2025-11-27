import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="terminal-container">
      <div className="noise"></div>
      <div className="overlay"></div>

      <div className="terminal">
        <h1 className="font-rosca">
          Error <span className="errorcode">404</span>
        </h1>
        <p className="output">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className="output">
          Please try to <Link to="/">return to the homepage</Link>.
        </p>
        <p className="output">Good luck.</p>
      </div>
    </div>
  );
};

export default PageNotFound;