import React, { useEffect, useState } from "react";

export default function Incount({ count }) {
  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
      key={count}
    >
      <h3>Currently inside: </h3>
      <h3>{count}</h3>
    </div>
  );
}
