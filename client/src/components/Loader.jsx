import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setloading] = useState();

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loader">
        <HashLoader
          color="#000"
          loading={loading}
          css=""
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
