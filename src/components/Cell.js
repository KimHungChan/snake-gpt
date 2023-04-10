import styled from "styled-components";

const Cell = styled.div`
  position: absolute;
  width: 2%;
  height: 2%;
  background-color: ${(props) => (props.snake ? "black" : "red")};
  border: 1px solid #cfcfcf;
  z-index: 1;
`;

export default Cell;
