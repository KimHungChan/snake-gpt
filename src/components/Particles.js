import React from "react";
import styled, { keyframes } from "styled-components";

const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

const generateKeyframes = (x, y) => keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(0);
  }
  100% {
    opacity: 0;
    transform: translate(${x}px, ${y}px) scale(1);
  }
`;

const Particle = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  animation: ${(props) => generateKeyframes(props.x, props.y)}
    ${(props) => props.duration}s linear forwards;
`;

const colors = ["#f44336", "#2196f3", "#4caf50", "#ffeb3b", "#ff9800"];

const Particles = ({ position, count = 30 }) => {
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 360) / count;
      const x = 1 * Math.cos((angle * Math.PI) / 180);
      const y = 1 * Math.sin((angle * Math.PI) / 180);
      const distance = Math.random() * 50 + 50;
      const size = Math.random() * 5 + 4; // Increase the size range of particles
      const duration = Math.random() * 1 + 0.5;
      const color = randomColor();
      particles.push(
        <Particle
          key={i}
          size={size}
          color={color}
          x={x * distance}
          y={y * distance}
          duration={duration}
          style={{
            left: `${position[0]}%`,
            top: `${position[1]}%`,
          }}
        />
      );
    }
    return particles;
  };

  return <>{createParticles()}</>;
};

export default Particles;
