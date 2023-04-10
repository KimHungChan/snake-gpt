import React from "react";
import Cell from "./Cell";

const Snake = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((dot, i) => (
        <Cell key={i} snake style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }} />
      ))}
    </>
  );
};

export default Snake;
