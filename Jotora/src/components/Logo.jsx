import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="logo" style={{ width }}>
      <h1>Jotora</h1>
    </div>
  );
}

export default Logo;
