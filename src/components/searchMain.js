import React from "react";
import "../components/style.css";

function searchMain() {
  return (
    <div className="wrap">
      <div className="search">
        <input type="search" placeholder="Enter City Name" id="search" />
      </div>
      <button className="searchButton">Search City</button>
    </div>
  );
}

export default searchMain;
