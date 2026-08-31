import { useState, useRef, useEffect } from "react";
import AnimatedLayout from "../components/AnimatedLayout";
import { sfx } from "../utils/sfx";

const COMMANDS = {
  help: () => [
    "Available commands:",
    "  about      — Who I am",
    "  skills     — What I know",
    "  projects   — What I've built",
    "  contact    — How to reach me",
    "  whoami     — Quick intro",
    "  play       — Launch Retro Matrix Snake Mini-Game",
    "  clear      — Clear terminal",
  ],
  about: () => [
    "Name    : Akash",
    "Based   : Coimbatore, India",
    "Role    : Designer + Developer + 3D Modeler",
    "Status  : Open to work",
    "",
    "I build things that look good and work well.",
    "Design is my first language. Code is the second.",
  ],
  whoami: () => [
    "akash — creative technologist, problem solver, pixel pusher.",
  ],
  skills: () => [
    "LANGUAGES  : Python (80%), C/C++ (70%), Java (70%), TypeScript (50%)",
    "FRONTEND   : HTML (90%), CSS (90%), React (80%)",
    "BACKEND    : FastAPI (70%), MongoDB (85%), Firebase (75%)",
    "CREATIVE   : Photoshop (85%), Illustrator (80%), Figma (90%), Blender (65%)",
  ],
  projects: () => [
    "Run `npm ls` just kidding —",
    "",
    "Scroll to the Showcase section to see everything.",
    "Or visit: github.com/akash-exe-19",
  ],
  contact: () => [
    "Email   : akash19cbe@gmail.com",
    "LinkedIn: linkedin.com/in/akash-k-19-cbe",
    "GitHub  : github.com/akash-exe-19",
  ],
  clear: () => null,
  "sudo rm -rf /": () => [
    "Nice try.",
    "...just kidding, running it now.",
    "just kidding.",
  ],
};

const GRID_SIZE = 15;

const Terminal = ({ id = "terminal" }) => {
  const [history, setHistory] = useState([
    { type: "output", lines: ["Welcome. Type `help` or `play` to begin.", ""] },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const outputContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Snake Mini-Game State
  const [isGaming, setIsGaming] = useState(false);
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [food, setFood] = useState({ x: 4, y: 4 });
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const dirRef = useRef(dir);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  // Window Arrow Key Listener to Prevent Window Scrolling During Gameplay
  useEffect(() => {
    if (!isGaming) return;

    const handleGameKeys = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.key === "ArrowUp" && dirRef.current.y === 0) {
        setDir({ x: 0, y: -1 });
      } else if (e.key === "ArrowDown" && dirRef.current.y === 0) {
        setDir({ x: 0, y: 1 });
      } else if (e.key === "ArrowLeft" && dirRef.current.x === 0) {
        setDir({ x: -1, y: 0 });
      } else if (e.key === "ArrowRight" && dirRef.current.x === 0) {
        setDir({ x: 1, y: 0 });
      } else if (e.key === "Escape") {
        setIsGaming(false);
      }
    };

    window.addEventListener("keydown", handleGameKeys, { capture: true });
    return () => window.removeEventListener("keydown", handleGameKeys, { capture: true });
  }, [isGaming]);

  useEffect(() => {
    if (outputContainerRef.current && !isGaming) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history, isGaming]);

  // Snake Game Loop
  useEffect(() => {
    if (!isGaming || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { x: prevSnake[0].x + dir.x, y: prevSnake[0].y + dir.y };

        // Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          sfx.playGameOver();
          setGameOver(true);
          return prevSnake;
        }

        // Self Collision
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          sfx.playGameOver();
          setGameOver(true);
          return prevSnake;
        }

        // Eat Food
        if (head.x === food.x && head.y === food.y) {
          sfx.playClick();
          setScore((s) => {
            const next = s + 10;
            if (next > highScore) setHighScore(next);
            return next;
          });
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
          return [head, ...prevSnake];
        }

        return [head, ...prevSnake.slice(0, -1)];
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isGaming, gameOver, dir, food, highScore]);

  const startNewGame = () => {
    sfx.playCommand();
    setSnake([{ x: 7, y: 7 }]);
    setDir({ x: 1, y: 0 });
    setFood({ x: 3, y: 3 });
    setScore(0);
    setGameOver(false);
    setIsGaming(true);
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [trimmed, ...prev]);
    setCmdIndex(-1);

    if (trimmed === "play" || trimmed === "game" || trimmed === "snake") {
      startNewGame();
      return;
    }

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    sfx.playCommand();
    const fn = COMMANDS[trimmed];
    const output = fn ? fn() : [`Command not found: '${trimmed}'. Type 'help' or 'play'.`];

    setHistory((prev) => [
      ...prev,
      { type: "input", text: trimmed },
      { type: "output", lines: output },
    ]);
  };

  const handleKeyDown = (e) => {
    if (isGaming) {
      if (e.key === "ArrowUp" && dir.y === 0) {
        e.preventDefault();
        setDir({ x: 0, y: -1 });
      } else if (e.key === "ArrowDown" && dir.y === 0) {
        e.preventDefault();
        setDir({ x: 0, y: 1 });
      } else if (e.key === "ArrowLeft" && dir.x === 0) {
        e.preventDefault();
        setDir({ x: -1, y: 0 });
      } else if (e.key === "ArrowRight" && dir.x === 0) {
        e.preventDefault();
        setDir({ x: 1, y: 0 });
      } else if (e.key === "Escape") {
        setIsGaming(false);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(newIdx);
      setInput(cmdHistory[newIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(cmdIndex - 1, -1);
      setCmdIndex(newIdx);
      setInput(cmdIndex <= 0 ? "" : cmdHistory[newIdx] || "");
    }
  };

  return (
    <AnimatedLayout id={id}>
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <div className="mb-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-accent-blue)" }}>
            [ INTERACTIVE ]
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">TERMINAL</h2>
          <p className="font-mono text-sm text-white/30">Ask me anything, or type `play` to start the mini-game.</p>
        </div>

        {/* Terminal window */}
        <div
          className="border border-white/15 bg-black"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-white/20 ml-2 tracking-widest">
                {isGaming ? "snake_v1.0.exe" : "akash@portfolio: ~"}
              </span>
            </div>
            {isGaming && (
              <button
                onClick={() => setIsGaming(false)}
                className="text-white/40 hover:text-white border border-white/10 px-2 py-0.5 text-[10px] uppercase cursor-pointer"
              >
                [ QUIT GAME ]
              </button>
            )}
          </div>

          {/* Area display */}
          {isGaming ? (
            <div className="p-6 font-mono flex flex-col items-center justify-center min-h-[350px]">
              <div className="flex justify-between w-full max-w-[270px] mb-4 text-xs">
                <span>SCORE: <strong className="text-accent-blue">{score}</strong></span>
                <span className="text-white/40">HIGH: {highScore}</span>
              </div>

              {/* Grid Board */}
              <div
                className="grid gap-[1px] bg-white/10 border border-white/20 p-[1px]"
                style={{
                  gridTemplateColumns: `repeat(${GRID_SIZE}, 16px)`,
                  gridTemplateRows: `repeat(${GRID_SIZE}, 16px)`,
                }}
              >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                  const x = i % GRID_SIZE;
                  const y = Math.floor(i / GRID_SIZE);
                  const isHead = snake[0].x === x && snake[0].y === y;
                  const isBody = snake.some((s) => s.x === x && s.y === y);
                  const isFood = food.x === x && food.y === y;

                  return (
                    <div
                      key={i}
                      className="w-4 h-4 transition-colors"
                      style={{
                        backgroundColor: isHead
                          ? "var(--color-accent-blue)"
                          : isBody
                          ? "rgba(255, 255, 255, 0.7)"
                          : isFood
                          ? "#10b981"
                          : "#000000",
                      }}
                    />
                  );
                })}
              </div>

              {gameOver ? (
                <div className="mt-4 text-center">
                  <p className="text-red-400 text-sm font-bold mb-2">GAME OVER!</p>
                  <button
                    onClick={startNewGame}
                    className="border border-white/20 px-3 py-1 text-xs text-white hover:border-accent-blue hover:text-accent-blue transition-all cursor-pointer"
                  >
                    [ RESTART GAME ]
                  </button>
                </div>
              ) : (
                <p className="text-[10px] text-white/30 mt-4 tracking-widest">
                  USE ARROW KEYS TO CONTROL · ESC TO QUIT
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Output area */}
              <div ref={outputContainerRef} className="p-6 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto">
                {history.map((entry, i) =>
                  entry.type === "input" ? (
                    <div key={i} className="flex gap-3 mb-1">
                      <span style={{ color: "var(--color-accent-blue)" }}>akash@portfolio:~$</span>
                      <span className="text-white">{entry.text}</span>
                    </div>
                  ) : (
                    <div key={i} className="mb-4 pl-0">
                      {entry.lines.map((line, j) => (
                        <div key={j} className="text-white/60 leading-relaxed">
                          {line || "\u00a0"}
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>

              {/* Input row */}
              <div className="flex items-center gap-3 px-6 py-4 border-t border-white/10">
                <span className="font-mono text-sm shrink-0" style={{ color: "var(--color-accent-blue)" }}>
                  akash@portfolio:~$
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-white caret-transparent"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  aria-label="Terminal input"
                />
                <span
                  className="w-2 h-4 inline-block"
                  style={{
                    backgroundColor: "var(--color-accent-blue)",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </div>
            </>
          )}
        </div>

        <p className="font-mono text-xs text-white/20 mt-4 text-right">
          ↑↓ history · type `play` for mini-game
        </p>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </AnimatedLayout>
  );
};

export default Terminal;

