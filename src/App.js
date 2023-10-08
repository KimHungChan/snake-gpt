import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import Board from "./components/Board";
import Food from "./components/Food";
import Particles from "./components/Particles"; // Import the Particles component
import Snake from "./components/Snake";
import gameoverSound from "./gameover.wav";

const getRandomCoordinates = () => {
  const min = 1;
  const max = 98;
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

// The speed values represent the time interval (in milliseconds) between
// consecutive snake movements. Lower speed values correspond to shorter
// time intervals, causing the snake to move more quickly and making the
// game more challenging. Thus, the hard difficulty has the lowest speed value.
const difficultySpeeds = {
  easy: 200,
  medium: 100,
  hard: 50,
};

const App = () => {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [food, setFood] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [particles, setParticles] = useState(null); // Add a new state for particles
  const [playGameoverSound] = useSound(gameoverSound);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snakeDots, direction]);

  useEffect(() => {
    document.onkeydown = onKeyDown;
  }, []);

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 38:
        setDirection("UP");
        break;
      case 40:
        setDirection("DOWN");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      default:
        break;
    }

    dots.push(head);
    dots.shift();

    setSnakeDots(dots);
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
  };

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates());
      setParticles(
        <Particles position={[food[0], food[1]]} /> // Create particles when the snake eats food
      );
      setTimeout(() => setParticles(null), 1000); // Remove particles after 1 second
      enlargeSnake();
      increaseSpeed();
      setScore(score + 1);
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  };

  const gameOver = () => {
    playGameoverSound(); // Play the gameover sound
    alert(`Game Over! Snake length is ${snakeDots.length}`);
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setFood(getRandomCoordinates());
    setDirection("RIGHT");
    setSpeed(200);
    setScore(0); // Reset the score
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    setSpeed(difficultySpeeds[e.target.value]);
  };

  return (
    <div className="App">
      <h1>Snake Game</h1>
      <h2>Score: {score}</h2>
      <div>
        <label htmlFor="difficulty">Difficulty: </label>
        <select
          name="difficulty"
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <Board>
        <Snake snakeDots={snakeDots} />
        <Food dot={food} />
        {particles} {/* Render the particles */}
      </Board>
    </div>
  );
};

export default App;
