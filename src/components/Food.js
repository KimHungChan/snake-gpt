import React from "react";
import Cell from "./Cell";

const Food = ({ dot }) => {
  const style = {
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
  };

  return <Cell style={style} />;
};

export default Food;
