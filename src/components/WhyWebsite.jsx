import { useEffect, useRef, useState, useCallback } from "react";

// ── PIXEL ART CONSTANTS ──────────────────────────────────────────────────────
const TILE = 32;
const COLS = 20;
const ROWS = 14;
const W = COLS * TILE;
const H = ROWS * TILE;

const GRAVITY = 0.55;
const JUMP_FORCE = -12;
const MOVE_SPEED = 4;
const GROUND_ROW = ROWS - 3;

// Palette matching site theme
const C = {
  sky:     "#05070f",
  ground:  "#facc15",
  groundD: "#b8960f",
  brick:   "#0f1827",
  brickB:  "#facc15",
  pipe:    "#4ade80",
  pipeD:   "#16a34a",
  coin:    "#facc15",
  enemy:   "#f472b6",
  enemyD:  "#be185d",
  hero:    "#facc15",
  heroD:   "#b8960f",
  star:    "#818cf8",
  cloud:   "#1e293b",
  flag:    "#4ade80",
  text:    "#eef2ff",
  muted:   "#8b97b5",
};

// Level layout: array of platform objects + coins + enemies
const PLATFORMS = [
  // ground
  ...Array.from({ length: COLS }, (_, x) => ({ x, y: GROUND_ROW,     type: "ground" })),
  ...Array.from({ length: COLS }, (_, x) => ({ x, y: GROUND_ROW + 1, type: "groundD" })),
  // floating bricks
  { x: 3,  y: 8, type: "brick" }, { x: 4,  y: 8, type: "brick" }, { x: 5,  y: 8, type: "brick" },
  { x: 8,  y: 7, type: "brick" }, { x: 9,  y: 7, type: "brick" },
  { x: 12, y: 9, type: "brick" }, { x: 13, y: 9, type: "brick" }, { x: 14, y: 9, type: "brick" },
  { x: 16, y: 6, type: "brick" }, { x: 17, y: 6, type: "brick" },
  // pipes
  { x: 6,  y: GROUND_ROW - 1, type: "pipe" }, { x: 6, y: GROUND_ROW - 2, type: "pipeTop" },
  { x: 11, y: GROUND_ROW - 1, type: "pipe" }, { x: 11, y: GROUND_ROW - 2, type: "pipeTop" },
  { x: 18, y: GROUND_ROW - 1, type: "pipe" }, { x: 18, y: GROUND_ROW - 2, type: "pipeTop" },
                                               { x: 18, y: GROUND_ROW - 3, type: "pipeTop" },
];

const INIT_COINS = [
  { x: 3.5, y: 7, id: 0 }, { x: 4.5, y: 7, id: 1 }, { x: 5.5, y: 7, id: 2 },
  { x: 8.5, y: 6, id: 3 }, { x: 9.5, y: 6, id: 4 },
  { x: 12.5, y: 8, id: 5 }, { x: 13.5, y: 8, id: 6 }, { x: 14.5, y: 8, id: 7 },
  { x: 1.5, y: GROUND_ROW - 0.5, id: 8 }, { x: 16.5, y: 5, id: 9 }, { x: 17.5, y: 5, id: 10 },
];

const INIT_ENEMIES = [
  { x: 2, y: GROUND_ROW - 1, dir: 1, id: 0 },
  { x: 9, y: GROUND_ROW - 1, dir: -1, id: 1 },
  { x: 14, y: GROUND_ROW - 1, dir: 1, id: 2 },
];

function drawPixelRect(ctx, x, y, w, h, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }
}

function drawHero(ctx, px, py, frame) {
  const x = Math.round(px);
  const y = Math.round(py);
  const S = TILE;
  // body
  drawPixelRect(ctx, x + 4, y + 8, S - 8, S - 10, C.hero);
  // head
  drawPixelRect(ctx, x + 6, y + 2, S - 12, 8, C.hero);
  // eye
  ctx.fillStyle = "#000";
  ctx.fillRect(x + (frame % 2 === 0 ? S - 10 : 10), y + 4, 3, 3);
  // cap
  drawPixelRect(ctx, x + 4, y, S - 8, 4, C.heroD);
  drawPixelRect(ctx, x + 2, y + 3, S - 4, 3, C.heroD);
  // legs
  const legOff = Math.floor(frame / 3) % 2 === 0 ? 0 : 3;
  drawPixelRect(ctx, x + 6, y + S - 6, 6, 6, C.heroD);
  drawPixelRect(ctx, x + S - 12, y + S - 6 + legOff, 6, 6, C.heroD);
}

function drawEnemy(ctx, px, py) {
  const x = Math.round(px * TILE);
  const y = Math.round(py * TILE);
  drawPixelRect(ctx, x + 4, y + 4, TILE - 8, TILE - 8, C.enemy);
  drawPixelRect(ctx, x + 6, y + 2, TILE - 12, 6, C.enemyD);
  ctx.fillStyle = "#fff";
  ctx.fillRect(x + 7, y + 6, 4, 4);
  ctx.fillRect(x + TILE - 11, y + 6, 4, 4);
  ctx.fillStyle = "#000";
  ctx.fillRect(x + 8, y + 7, 2, 2);
  ctx.fillRect(x + TILE - 10, y + 7, 2, 2);
}

function drawCoin(ctx, cx, cy, tick) {
  const x = Math.round(cx * TILE);
  const y = Math.round(cy * TILE) + Math.sin(tick * 0.08) * 3;
  const w = Math.abs(Math.cos(tick * 0.06)) * (TILE * 0.5) + 4;
  ctx.fillStyle = C.coin;
  ctx.beginPath();
  ctx.ellipse(x + TILE / 2, y + TILE / 2, w / 2, TILE * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = C.groundD;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 8px monospace";
  ctx.fillText("₿", x + TILE / 2 - 3, y + TILE / 2 + 3);
}

function drawTile(ctx, tx, ty, type) {
  const x = tx * TILE, y = ty * TILE;
  if (type === "ground") {
    drawPixelRect(ctx, x, y, TILE, TILE, C.ground, C.groundD);
    ctx.fillStyle = C.groundD;
    ctx.fillRect(x + 2, y + 4, 6, 2);
    ctx.fillRect(x + 14, y + 10, 10, 2);
  } else if (type === "groundD") {
    drawPixelRect(ctx, x, y, TILE, TILE, C.groundD);
    ctx.fillStyle = "#7a6409";
    ctx.fillRect(x + 4, y + 6, 8, 2);
    ctx.fillRect(x + 18, y + 14, 8, 2);
  } else if (type === "brick") {
    drawPixelRect(ctx, x, y, TILE, TILE, C.brick, C.brickB);
    ctx.strokeStyle = C.brickB;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 4, y + 4, TILE - 8, TILE - 8);
    ctx.fillStyle = C.brickB;
    ctx.fillRect(x + 2, y + 2, 2, 2);
    ctx.fillRect(x + TILE - 4, y + TILE - 4, 2, 2);
  } else if (type === "pipe" || type === "pipeTop") {
    drawPixelRect(ctx, x + 2, y, TILE - 4, TILE, C.pipe);
    ctx.fillStyle = C.pipeD;
    ctx.fillRect(x + 2, y, 4, TILE);
    ctx.fillRect(x + TILE - 6, y, 4, TILE);
    if (type === "pipeTop") {
      drawPixelRect(ctx, x, y, TILE, TILE / 2, C.pipe, C.pipeD);
      ctx.fillStyle = C.pipeD;
      ctx.fillRect(x, y, 4, TILE / 2);
    }
  }
}

function drawCloud(ctx, cx, cy) {
  ctx.fillStyle = C.cloud;
  [[-16, 0, 28, 18], [0, -10, 20, 20], [16, 0, 28, 18]].forEach(([dx, dy, w, h]) => {
    ctx.beginPath();
    ctx.ellipse(cx + dx, cy + dy, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

function isSolid(tx, ty) {
  return PLATFORMS.some(p => p.x === tx && p.y === ty);
}

function collideRect(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export default function WhyWebsite({ setPage }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const keysRef   = useRef({});
  const rafRef    = useRef(null);
  const [score,   setScore]   = useState(0);
  const [lives,   setLives]   = useState(3);
  const [gameMsg, setGameMsg] = useState("← → to move  |  ↑ or Space to jump");
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer:coarse)").matches || window.innerWidth < 600);
  }, []);

  const initState = useCallback(() => ({
    hx: 1 * TILE, hy: (GROUND_ROW - 1) * TILE,
    hvx: 0, hvy: 0,
    onGround: false,
    frame: 0,
    coins: INIT_COINS.map(c => ({ ...c })),
    enemies: INIT_ENEMIES.map(e => ({ ...e })),
    particles: [],
    tick: 0,
    dead: false,
    won: false,
    score: 0,
    lives: 3,
  }), []);

  const resetGame = useCallback(() => {
    stateRef.current = initState();
    setScore(0);
    setLives(3);
    setGameMsg("← → to move  |  ↑ or Space to jump");
    setStarted(true);
  }, [initState]);

  // keyboard
  useEffect(() => {
    const down = (e) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(e.code)) e.preventDefault();
      keysRef.current[e.code] = true;
      if (!started) { resetGame(); }
    };
    const up = (e) => { keysRef.current[e.code] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [started, resetGame]);

  // game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // scale for retina
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    stateRef.current = initState();

    const loop = () => {
      const s = stateRef.current;
      const keys = keysRef.current;

      // ── INPUT ──
      if (!s.dead && !s.won) {
        if (keys["ArrowLeft"]  || keys["KeyA"]) s.hvx = -MOVE_SPEED;
        else if (keys["ArrowRight"] || keys["KeyD"]) s.hvx = MOVE_SPEED;
        else s.hvx *= 0.7;

        if ((keys["ArrowUp"] || keys["Space"] || keys["KeyW"]) && s.onGround) {
          s.hvy = JUMP_FORCE;
          s.onGround = false;
        }
      }

      if (!s.dead && !s.won) {
        // ── PHYSICS ──
        s.hvy += GRAVITY;
        s.hx += s.hvx;
        s.hy += s.hvy;
        s.frame++;

        // tile collisions
        s.onGround = false;
        const hTileX1 = Math.floor(s.hx / TILE);
        const hTileX2 = Math.floor((s.hx + TILE - 2) / TILE);
        const hTileY  = Math.floor((s.hy + TILE) / TILE);
        const hTileYT = Math.floor(s.hy / TILE);

        // floor
        if (isSolid(hTileX1, hTileY) || isSolid(hTileX2, hTileY)) {
          s.hy = hTileY * TILE - TILE;
          s.hvy = 0;
          s.onGround = true;
        }
        // ceiling
        if (isSolid(hTileX1, hTileYT) || isSolid(hTileX2, hTileYT)) {
          s.hy = (hTileYT + 1) * TILE;
          s.hvy = Math.abs(s.hvy);
        }
        // walls
        const midTileY1 = Math.floor(s.hy / TILE);
        const midTileY2 = Math.floor((s.hy + TILE - 2) / TILE);
        if (isSolid(Math.floor(s.hx / TILE), midTileY1) || isSolid(Math.floor(s.hx / TILE), midTileY2)) {
          s.hx += MOVE_SPEED;
        }
        if (isSolid(Math.floor((s.hx + TILE) / TILE), midTileY1) || isSolid(Math.floor((s.hx + TILE) / TILE), midTileY2)) {
          s.hx -= MOVE_SPEED;
        }

        // bounds
        if (s.hx < 0) s.hx = 0;
        if (s.hx > (COLS - 1) * TILE) s.hx = (COLS - 1) * TILE;

        // fell off screen
        if (s.hy > H + 50) {
          s.lives--;
          if (s.lives <= 0) { s.dead = true; setGameMsg("Game Over! Press any key to retry"); }
          else { s.hx = 1 * TILE; s.hy = (GROUND_ROW - 2) * TILE; s.hvy = 0; }
          setLives(s.lives);
        }

        // ── COINS ──
        s.coins = s.coins.filter(coin => {
          const hit = collideRect(s.hx, s.hy, TILE - 4, TILE - 4,
                                  coin.x * TILE, coin.y * TILE, TILE * 0.6, TILE * 0.6);
          if (hit) {
            s.score += 10;
            setScore(s.score);
            // spawn particles
            for (let i = 0; i < 6; i++) {
              s.particles.push({
                x: coin.x * TILE + TILE / 2, y: coin.y * TILE,
                vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 5 - 2,
                life: 30, color: C.coin
              });
            }
            return false;
          }
          return true;
        });

        // ── ENEMIES ──
        s.enemies = s.enemies.filter(en => {
          en.x += en.dir * 0.04;
          if (en.x < 0.5 || en.x > COLS - 1.5) en.dir *= -1;
          // bounce off walls & pipes
          const nextTile = Math.floor((en.x + (en.dir > 0 ? 1 : 0)) + en.dir);
          if (isSolid(nextTile, Math.floor(en.y)) || isSolid(nextTile, Math.floor(en.y + 0.8))) en.dir *= -1;

          const ex = en.x * TILE, ey = en.y * TILE;
          // hero stomps enemy
          if (collideRect(s.hx + 4, s.hy, TILE - 8, TILE,
                          ex + 4, ey, TILE - 8, TILE)) {
            if (s.hy + TILE < ey + 12 && s.hvy > 0) {
              s.score += 50;
              setScore(s.score);
              s.hvy = JUMP_FORCE * 0.5;
              for (let i = 0; i < 8; i++) {
                s.particles.push({ x: ex + TILE/2, y: ey, vx: (Math.random()-0.5)*5, vy: -Math.random()*4-1, life:25, color:C.enemy });
              }
              return false;
            } else {
              // hero dies
              s.lives--;
              if (s.lives <= 0) { s.dead = true; setGameMsg("Game Over! Press any key to retry"); }
              else { s.hx = 1 * TILE; s.hy = (GROUND_ROW - 2) * TILE; s.hvy = 0; }
              setLives(s.lives);
            }
          }
          return true;
        });

        // Win condition
        if (s.coins.length === 0 && !s.won) {
          s.won = true;
          setGameMsg(`🏆 You collected all coins! Score: ${s.score} — Press any key to play again`);
        }

        // restart after dead/won
        if ((s.dead || s.won) && Object.values(keys).some(Boolean)) {
          stateRef.current = initState();
          setScore(0); setLives(3);
          setGameMsg("← → to move  |  ↑ or Space to jump");
          Object.keys(keys).forEach(k => { keys[k] = false; });
        }
      }

      // ── PARTICLES ──
      s.particles = s.particles.filter(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life--;
        return p.life > 0;
      });

      s.tick++;

      // ── DRAW ──
      ctx.clearRect(0, 0, W, H);

      // sky
      ctx.fillStyle = C.sky;
      ctx.fillRect(0, 0, W, H);

      // stars
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      [[40,20],[120,35],[200,15],[320,45],[450,25],[520,40],[600,18],[640,50]].forEach(([sx,sy]) => {
        ctx.fillRect(sx + Math.sin(s.tick * 0.01 + sx) * 1, sy, 2, 2);
      });

      // clouds
      [[80, 40], [280, 55], [480, 30], [580, 60]].forEach(([cx, cy]) => {
        drawCloud(ctx, cx + Math.sin(s.tick * 0.005 + cx) * 8, cy);
      });

      // tiles
      PLATFORMS.forEach(p => drawTile(ctx, p.x, p.y, p.type));

      // flag at end
      const fx = 19 * TILE, fy = (GROUND_ROW - 4) * TILE;
      ctx.strokeStyle = C.muted; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(fx + TILE/2, fy); ctx.lineTo(fx + TILE/2, fy + 4*TILE); ctx.stroke();
      ctx.fillStyle = C.flag;
      ctx.beginPath(); ctx.moveTo(fx + TILE/2, fy); ctx.lineTo(fx + TILE, fy + 10); ctx.lineTo(fx + TILE/2, fy + 20); ctx.fill();

      // coins
      s.coins.forEach(coin => drawCoin(ctx, coin.x, coin.y, s.tick));

      // enemies
      s.enemies.forEach(en => drawEnemy(ctx, en.x, en.y));

      // hero
      drawHero(ctx, s.hx, s.hy, s.frame);

      // particles
      s.particles.forEach(p => {
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
      });
      ctx.globalAlpha = 1;

      // HUD
      ctx.fillStyle = C.text;
      ctx.font = "bold 13px monospace";
      ctx.fillText(`SCORE: ${s.score}`, 12, 20);
      ctx.fillText(`COINS: ${s.coins.length} left`, W/2 - 45, 20);
      // lives
      for (let i = 0; i < s.lives; i++) {
        ctx.fillStyle = C.hero;
        ctx.fillRect(W - 24 - i * 20, 8, 14, 14);
      }

      // overlay if not started
      if (!started) {
        ctx.fillStyle = "rgba(5,7,15,0.7)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = C.gold;
        ctx.font = "bold 22px monospace";
        ctx.textAlign = "center";
        ctx.fillText("PRESS ANY KEY / TAP TO START", W/2, H/2 - 10);
        ctx.fillStyle = C.muted;
        ctx.font = "13px monospace";
        ctx.fillText("Collect all coins. Stomp the enemies. Reach the flag!", W/2, H/2 + 18);
        ctx.textAlign = "left";
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [initState, started]);

  // mobile controls
  const mobilePress = (key, val) => { keysRef.current[key] = val; if (val && !started) resetGame(); };

  return (
    <section className="game-section" id="game">
      <div className="wrap">
        <div className="game-header sr">
          <span className="tag">Mini Game</span>
          <h2 className="sec-h">Take a <em>break</em> — play a level</h2>
          <p className="muted">Collect every coin, stomp the enemies, reach the flag. Built into this portfolio because why not.</p>
        </div>

        <div className="game-wrap sr">
          <div className="game-status">
            <span className="game-msg">{gameMsg}</span>
            <button className="btn btn-ghost game-restart" onClick={resetGame}>↺ Restart</button>
          </div>

          <div className="canvas-shell">
            <canvas ref={canvasRef} />
          </div>

          {/* Mobile controls */}
          {isMobile && (
            <div className="mobile-controls">
              <div className="mc-row">
                <button className="mc-btn"
                  onTouchStart={() => mobilePress("ArrowLeft", true)}
                  onTouchEnd={() => mobilePress("ArrowLeft", false)}
                  onMouseDown={() => mobilePress("ArrowLeft", true)}
                  onMouseUp={() => mobilePress("ArrowLeft", false)}>◀</button>
                <button className="mc-btn mc-jump"
                  onTouchStart={() => mobilePress("ArrowUp", true)}
                  onTouchEnd={() => mobilePress("ArrowUp", false)}
                  onMouseDown={() => mobilePress("ArrowUp", true)}
                  onMouseUp={() => mobilePress("ArrowUp", false)}>▲ JUMP</button>
                <button className="mc-btn"
                  onTouchStart={() => mobilePress("ArrowRight", true)}
                  onTouchEnd={() => mobilePress("ArrowRight", false)}
                  onMouseDown={() => mobilePress("ArrowRight", true)}
                  onMouseUp={() => mobilePress("ArrowRight", false)}>▶</button>
              </div>
            </div>
          )}
        </div>

        <div className="game-cta sr">
          <p className="muted">Enjoyed that? Imagine what I can build for your business.</p>
          <button className="btn btn-gold" onClick={() => setPage("contact")}>
            Let's Build Together
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}