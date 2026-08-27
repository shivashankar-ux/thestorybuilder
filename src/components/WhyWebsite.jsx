import { useEffect, useRef, useState, useCallback } from "react";

// ── SNAKE GAME CONSTANTS ───────────────────────────────────────────────────
const COLS = 20;
const ROWS = 14;
const TILE = 32;
const W = COLS * TILE; // 640px
const H = ROWS * TILE; // 448px

const INITIAL_SNAKE = [
  { x: 10, y: 7 },
  { x: 9, y: 7 },
  { x: 8, y: 7 },
];
const INITIAL_DIR = { x: 1, y: 0 };
const GAME_SPEED_MS = 105; // ~9.5 steps per second

const COLORS = {
  bg: "#05070f",
  gridDots: "rgba(255, 255, 255, 0.05)",
  snakeHead: "#FACC15",
  snakeBody: "rgba(250, 204, 21, 0.85)",
  snakeInner: "#B8960F",
  food: "#4ADE80",
  foodGlow: "rgba(74, 222, 128, 0.4)",
  text: "#FAF7F2",
  muted: "#8B97B5",
};

export default function WhyWebsite({ setPage }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("tsb_snake_highscore") || "0", 10);
    }
    return 0;
  });
  const [gameState, setGameState] = useState("idle"); // 'idle' | 'playing' | 'gameover'
  const [isMobile, setIsMobile] = useState(false);

  // Game state held in ref for atomic access inside loop
  const gameRef = useRef({
    snake: [...INITIAL_SNAKE],
    dir: { ...INITIAL_DIR },
    nextDir: { ...INITIAL_DIR },
    food: { x: 15, y: 7 },
    score: 0,
    particles: [],
    state: "idle",
  });

  // Detect mobile device
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer:coarse)").matches || window.innerWidth < 640);
  }, []);

  // Spawn food in an empty position
  const spawnFood = (snake) => {
    let newFood;
    while (!newFood) {
      const rx = Math.floor(Math.random() * COLS);
      const ry = Math.floor(Math.random() * ROWS);
      if (!snake.some((seg) => seg.x === rx && seg.y === ry)) {
        newFood = { x: rx, y: ry };
      }
    }
    return newFood;
  };

  const startGame = useCallback(() => {
    const initialFood = spawnFood(INITIAL_SNAKE);
    gameRef.current = {
      snake: INITIAL_SNAKE.map((s) => ({ ...s })),
      dir: { ...INITIAL_DIR },
      nextDir: { ...INITIAL_DIR },
      food: initialFood,
      score: 0,
      particles: [],
      state: "playing",
    };
    setScore(0);
    setGameState("playing");
  }, []);

  // Direction handler preventing 180-degree turn
  const changeDirection = useCallback((dx, dy) => {
    const { dir, state } = gameRef.current;
    if (state !== "playing") return;
    // Cannot reverse direction into itself
    if (dx !== 0 && dir.x === -dx) return;
    if (dy !== 0 && dir.y === -dy) return;
    gameRef.current.nextDir = { x: dx, y: dy };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (gameRef.current.state !== "playing") {
        if (e.code === "Space" || e.code === "Enter" || e.code.startsWith("Arrow")) {
          startGame();
          return;
        }
      }

      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          changeDirection(0, -1);
          break;
        case "ArrowDown":
        case "KeyS":
          changeDirection(0, 1);
          break;
        case "ArrowLeft":
        case "KeyA":
          changeDirection(-1, 0);
          break;
        case "ArrowRight":
        case "KeyD":
          changeDirection(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, startGame]);

  // Main Canvas Render & Game Tick Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    let lastTime = performance.now();
    let accumulator = 0;
    let animId;

    const gameTick = () => {
      const g = gameRef.current;
      if (g.state !== "playing") return;

      // Update direction from input queue
      g.dir = { ...g.nextDir };

      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };

      // Wall collision check
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        g.state = "gameover";
        setGameState("gameover");
        return;
      }

      // Self collision check
      if (g.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        g.state = "gameover";
        setGameState("gameover");
        return;
      }

      // Move snake
      g.snake.unshift(head);

      // Food collection check
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score += 10;
        setScore(g.score);
        if (g.score > highScore) {
          setHighScore(g.score);
          localStorage.setItem("tsb_snake_highscore", g.score.toString());
        }

        // Spawn particles
        for (let i = 0; i < 8; i++) {
          g.particles.push({
            x: head.x * TILE + TILE / 2,
            y: head.y * TILE + TILE / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 20,
            color: COLORS.food,
          });
        }

        g.food = spawnFood(g.snake);
      } else {
        g.snake.pop();
      }
    };

    const render = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const g = gameRef.current;

      if (g.state === "playing") {
        accumulator += delta;
        while (accumulator >= GAME_SPEED_MS) {
          gameTick();
          accumulator -= GAME_SPEED_MS;
        }
      }

      // Update particles
      g.particles = g.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        return p.life > 0;
      });

      // Clear Screen
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, W, H);

      // Draw Grid Dots
      ctx.fillStyle = COLORS.gridDots;
      for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
          ctx.fillRect(x * TILE + TILE / 2 - 1, y * TILE + TILE / 2 - 1, 2, 2);
        }
      }

      // Draw Food (Glowing Coin)
      const fx = g.food.x * TILE + TILE / 2;
      const fy = g.food.y * TILE + TILE / 2;
      const pulse = Math.sin(currentTime * 0.008) * 2;

      ctx.save();
      ctx.shadowColor = COLORS.food;
      ctx.shadowBlur = 12;
      ctx.fillStyle = COLORS.food;
      ctx.beginPath();
      ctx.arc(fx, fy, TILE * 0.35 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Food Inner Symbol
      ctx.fillStyle = "#05070F";
      ctx.font = "800 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("★", fx, fy);
      ctx.restore();

      // Draw Snake Body
      g.snake.forEach((seg, index) => {
        const sx = seg.x * TILE + 2;
        const sy = seg.y * TILE + 2;
        const size = TILE - 4;
        const isHead = index === 0;

        ctx.save();
        if (isHead) {
          ctx.shadowColor = COLORS.snakeHead;
          ctx.shadowBlur = 10;
          ctx.fillStyle = COLORS.snakeHead;
          ctx.beginPath();
          ctx.roundRect(sx, sy, size, size, 8);
          ctx.fill();

          // Snake Eyes
          ctx.fillStyle = "#05070F";
          let eyeX1 = sx + 8, eyeY1 = sy + 8;
          let eyeX2 = sx + size - 12, eyeY2 = sy + 8;

          if (g.dir.x === 1) { eyeX1 = sx + size - 8; eyeX2 = sx + size - 8; eyeY1 = sy + 8; eyeY2 = sy + size - 12; }
          else if (g.dir.x === -1) { eyeX1 = sx + 8; eyeX2 = sx + 8; eyeY1 = sy + 8; eyeY2 = sy + size - 12; }
          else if (g.dir.y === 1) { eyeX1 = sx + 8; eyeX2 = sx + size - 12; eyeY1 = sy + size - 8; eyeY2 = sy + size - 8; }

          ctx.fillRect(eyeX1, eyeY1, 4, 4);
          ctx.fillRect(eyeX2, eyeY2, 4, 4);
        } else {
          ctx.fillStyle = COLORS.snakeBody;
          ctx.beginPath();
          ctx.roundRect(sx, sy, size, size, 5);
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw Particles
      g.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.life / 20;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Overlay for Idle / Game Over
      if (g.state === "idle" || g.state === "gameover") {
        ctx.fillStyle = "rgba(5, 7, 15, 0.82)";
        ctx.fillRect(0, 0, W, H);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (g.state === "idle") {
          ctx.fillStyle = COLORS.snakeHead;
          ctx.font = "800 24px var(--font-display, sans-serif)";
          ctx.fillText("🐍 CLASSIC SNAKE GAME", W / 2, H / 2 - 24);

          ctx.fillStyle = COLORS.muted;
          ctx.font = "600 14px var(--font-primary, sans-serif)";
          ctx.fillText("Press Arrow Keys or Tap to Start", W / 2, H / 2 + 16);
        } else if (g.state === "gameover") {
          ctx.fillStyle = "#EF4444";
          ctx.font = "800 26px var(--font-display, sans-serif)";
          ctx.fillText("GAME OVER!", W / 2, H / 2 - 34);

          ctx.fillStyle = COLORS.text;
          ctx.font = "700 16px var(--font-primary, sans-serif)";
          ctx.fillText(`Final Score: ${g.score}  |  High Score: ${highScore}`, W / 2, H / 2 + 4);

          ctx.fillStyle = COLORS.snakeHead;
          ctx.font = "600 13px var(--font-primary, sans-serif)";
          ctx.fillText("Press any Arrow Key or Tap to Play Again", W / 2, H / 2 + 42);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [highScore]);

  return (
    <section className="game-section" id="game">
      <div className="wrap">
        <div className="game-header sr">
          <span className="tag">Mini Game</span>
          <h2 className="sec-h">
            Take a <em>break</em> — play Classic Snake
          </h2>
          <p className="muted">
            Navigate the snake, collect glowing stars, and beat your high score. Built into this portfolio because why not.
          </p>
        </div>

        <div className="game-wrap sr">
          {/* Top Score Bar */}
          <div className="game-status">
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <span className="game-msg">SCORE: <strong>{score}</strong></span>
              <span className="game-msg" style={{ opacity: 0.75 }}>HIGH SCORE: <strong>{highScore}</strong></span>
            </div>
            <button className="btn btn-ghost game-restart" onClick={startGame}>
              ↺ {gameState === "idle" ? "Start Game" : "Restart"}
            </button>
          </div>

          {/* Canvas Wrapper */}
          <div
            className="canvas-shell"
            onClick={() => {
              if (gameState !== "playing") startGame();
            }}
            style={{ cursor: gameState !== "playing" ? "pointer" : "default" }}
          >
            <canvas ref={canvasRef} />
          </div>

          {/* Mobile Touch D-Pad */}
          {isMobile && (
            <div className="mobile-controls">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <button
                  type="button"
                  className="mc-btn"
                  onClick={() => {
                    if (gameState !== "playing") startGame();
                    else changeDirection(0, -1);
                  }}
                >
                  ▲
                </button>
                <div style={{ display: "flex", gap: 24 }}>
                  <button
                    type="button"
                    className="mc-btn"
                    onClick={() => {
                      if (gameState !== "playing") startGame();
                      else changeDirection(-1, 0);
                    }}
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    className="mc-btn"
                    onClick={() => {
                      if (gameState !== "playing") startGame();
                      else changeDirection(0, 1);
                    }}
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    className="mc-btn"
                    onClick={() => {
                      if (gameState !== "playing") startGame();
                      else changeDirection(1, 0);
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="game-cta sr">
          <p className="muted">Enjoyed that? Imagine what we can build for your business.</p>
          <button className="btn btn-gold" onClick={() => setPage && setPage("contact")}>
            Let's Build Together
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}