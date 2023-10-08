import styled from "styled-components";

const Cell = styled.div`
  position: absolute;
  width: 2%;
  height: 2%;
  background-color: ${(props) => (props.snake ? "#4caf50" : "#f44336")};
  border: 1px solid #111;
  z-index: 1;
  border-radius: 2px;
`;

export default Cell;
