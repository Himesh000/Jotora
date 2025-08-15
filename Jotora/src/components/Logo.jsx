import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="text-4xl font-bold" style={{ width }}>
      <h1>Jotora</h1>
    </div>
  );
}

export default Logo;
