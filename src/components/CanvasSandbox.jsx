import { useEffect, useRef, useState } from "react";
import { Sparkles, RefreshCw, ZoomIn, ZoomOut, Undo2 } from "lucide-react";
import { sfx } from "../utils/sfx";

// 3D Geometry Vertices and Edges Generators
const createCube = () => {
  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  return { vertices, edges };
};

const createOctahedron = () => {
  const vertices = [
    [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]
  ];
  const edges = [
    [0, 2], [2, 1], [1, 3], [3, 0],
    [0, 4], [1, 4], [2, 4], [3, 4],
    [0, 5], [1, 5], [2, 5], [3, 5]
  ];
  return { vertices, edges };
};

const createPyramid = () => {
  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1], [0, 1.2, 0]
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [0, 4], [1, 4], [2, 4], [3, 4]
  ];
  return { vertices, edges };
};

const createTorusKnot = (p = 2, q = 3, numPoints = 120) => {
  const vertices = [];
  const edges = [];
  for (let i = 0; i < numPoints; i++) {
    const phi = (i / numPoints) * Math.PI * 2 * p;
    const r = 0.5 * (2 + Math.sin((q * phi) / p));
    const x = r * Math.cos(phi) * 0.7;
    const y = r * Math.sin(phi) * 0.7;
    const z = 0.5 * Math.cos((q * phi) / p);
    vertices.push([x, y, z]);
  }
  for (let i = 0; i < numPoints; i++) {
    edges.push([i, (i + 1) % numPoints]);
    if (i % 6 === 0) {
      edges.push([i, (i + 15) % numPoints]);
    }
  }
  return { vertices, edges };
};

const SHAPES = {
  cube: { name: "CUBE", generator: createCube },
  octahedron: { name: "OCTAHEDRON", generator: createOctahedron },
  pyramid: { name: "PYRAMID", generator: createPyramid },
  torus: { name: "TORUS KNOT", generator: createTorusKnot },
  custom: { name: "+ CREATE MESH", generator: null },
};

const CanvasSandbox = () => {
  const canvasRef = useRef(null);
  const [shapeKey, setShapeKey] = useState("torus");
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1.0);

  // Custom Mesh Creator State & Undo History
  const [customVertices, setCustomVertices] = useState([
    [0, 1, 0],
    [-0.8, -0.6, 0.8],
    [0.8, -0.6, 0.8],
    [0, -0.6, -0.8],
  ]);
  const [customEdges, setCustomEdges] = useState([
    [0, 1], [0, 2], [0, 3],
    [1, 2], [2, 3], [3, 1],
  ]);
  const [historyStack, setHistoryStack] = useState([]);
  const [editTool, setEditTool] = useState("auto"); // "auto" or "manual"
  const [selectedVertex, setSelectedVertex] = useState(null);

  const rotRef = useRef({ x: 0.5, y: 0.5 });
  const isDraggingRef = useRef(false);
  const mouseDownPosRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const projectedRef = useRef([]);

  // Save State to History before modifying
  const pushHistory = () => {
    setHistoryStack((prev) => [
      ...prev,
      { vertices: JSON.parse(JSON.stringify(customVertices)), edges: JSON.parse(JSON.stringify(customEdges)) }
    ]);
  };

  // Undo (Ctrl + Z) Functionality
  const handleUndo = () => {
    if (historyStack.length === 0) return;
    sfx.playCommand();
    const lastState = historyStack[historyStack.length - 1];
    setCustomVertices(lastState.vertices);
    setCustomEdges(lastState.edges);
    setHistoryStack((prev) => prev.slice(0, -1));
    setSelectedVertex(null);
  };

  // Keyboard shortcut listener for Ctrl + Z / Cmd + Z
  useEffect(() => {
    if (shapeKey !== "custom") return;
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shapeKey, historyStack]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const shape =
      shapeKey === "custom"
        ? { vertices: customVertices, edges: customEdges }
        : SHAPES[shapeKey].generator();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (autoRotate && !isDraggingRef.current) {
        rotRef.current.x += 0.006;
        rotRef.current.y += 0.01;
      }

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;

      const scale = Math.min(canvas.width, canvas.height) * 0.28 * zoom;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-accent-blue")
          .trim() || "#00d2ff";

      // Project 3D vertices to 2D screen coordinates
      const projected = shape.vertices.map(([vx, vy, vz]) => {
        let x1 = vx * Math.cos(ry) + vz * Math.sin(ry);
        let z1 = -vx * Math.sin(ry) + vz * Math.cos(ry);

        let y2 = vy * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = vy * Math.sin(rx) + z1 * Math.cos(rx);

        const fov = 3.5;
        const p = fov / (fov + z2);

        return [cx + x1 * scale * p, cy + y2 * scale * p, z2];
      });

      projectedRef.current = projected;

      // Draw Edges
      ctx.lineWidth = 1.5;
      shape.edges.forEach(([i, j]) => {
        if (projected[i] && projected[j]) {
          const [x1, y1, z1] = projected[i];
          const [x2, y2, z2] = projected[j];

          const avgZ = (z1 + z2) / 2;
          const alpha = Math.min(1, Math.max(0.2, (avgZ + 1.5) / 3));

          ctx.strokeStyle = accent;
          ctx.globalAlpha = alpha;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });

      // Draw Vertices
      projected.forEach(([px, py, pz], idx) => {
        const isSelected = shapeKey === "custom" && selectedVertex === idx;

        if (isSelected) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = isSelected ? accent : "#ffffff";
        ctx.globalAlpha = Math.min(1, Math.max(0.4, (pz + 1.5) / 3));
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [shapeKey, customVertices, customEdges, autoRotate, zoom, selectedVertex]);

  const handleMouseDown = (e) => {
    if (e.target !== canvasRef.current) return;
    isDraggingRef.current = true;
    mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotRef.current.y += dx * 0.01;
    rotRef.current.x += dy * 0.01;

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
    if (e.target !== canvasRef.current) {
      isDraggingRef.current = false;
      return;
    }

    const dragDistance = Math.hypot(
      e.clientX - mouseDownPosRef.current.x,
      e.clientY - mouseDownPosRef.current.y
    );

    isDraggingRef.current = false;

    // Handle Click for Custom Mesh Creation ONLY if clicking canvas directly and not dragging
    if (shapeKey === "custom" && dragDistance < 5) {
      handleCanvasClick(e);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.min(3.0, Math.max(0.3, parseFloat((z + delta).toFixed(2)))));
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if clicked an existing vertex (hit test within 16px)
    const existingIndex = projectedRef.current.findIndex(
      ([px, py]) => Math.hypot(px - clickX, py - clickY) < 16
    );

    if (existingIndex !== -1) {
      sfx.playClick();
      if (editTool === "manual") {
        if (selectedVertex === null) {
          setSelectedVertex(existingIndex);
        } else if (selectedVertex !== existingIndex) {
          const edgeExists = customEdges.some(
            ([a, b]) =>
              (a === selectedVertex && b === existingIndex) ||
              (a === existingIndex && b === selectedVertex)
          );
          if (!edgeExists) {
            pushHistory();
            setCustomEdges((prev) => [...prev, [selectedVertex, existingIndex]]);
            sfx.playCommand();
          }
          setSelectedVertex(null);
        } else {
          setSelectedVertex(null);
        }
      } else {
        setSelectedVertex(existingIndex);
      }
      return;
    }

    // Unproject 2D click into 3D space to place a new vertex
    const rx = rotRef.current.x;
    const ry = rotRef.current.y;

    const scale = Math.min(canvas.width, canvas.height) * 0.28 * zoom;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const dx = (clickX - cx) / scale;
    const dy = (clickY - cy) / scale;
    const dz = 0;

    // Unrotate X
    const y1 = dy * Math.cos(-rx) - dz * Math.sin(-rx);
    const z1 = dy * Math.sin(-rx) + dz * Math.cos(-rx);

    // Unrotate Y
    const vx = dx * Math.cos(-ry) + z1 * Math.sin(-ry);
    const vy = y1;
    const vz = -dx * Math.sin(-ry) + z1 * Math.cos(-ry);

    pushHistory();
    const newVertexIndex = customVertices.length;
    const newVertices = [...customVertices, [vx, vy, vz]];
    setCustomVertices(newVertices);
    sfx.playClick();

    // Auto-Connect Logic
    if (editTool === "auto" && newVertices.length > 1) {
      const prevIndex = selectedVertex !== null ? selectedVertex : newVertexIndex - 1;
      setCustomEdges((prev) => [...prev, [prevIndex, newVertexIndex]]);
      setSelectedVertex(newVertexIndex);
    }
  };

  const clearCustomMesh = () => {
    pushHistory();
    sfx.playCommand();
    setCustomVertices([]);
    setCustomEdges([]);
    setSelectedVertex(null);
  };

  const clearCustomEdges = () => {
    pushHistory();
    sfx.playCommand();
    setCustomEdges([]);
  };

  return (
    <div className="border border-white/15 bg-black overflow-hidden relative group my-16 select-none">
      {/* Header Bar */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent-blue" />
          <span className="text-white font-bold tracking-widest">[ 3D MESH PLAYGROUND ]</span>
        </div>

        {/* Shape Switchers */}
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(SHAPES).map((key) => (
            <button
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
                setShapeKey(key);
              }}
              onMouseEnter={() => sfx.playHover()}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
                shapeKey === key
                  ? "border-accent-blue text-accent-blue bg-white/5 font-bold"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
              }`}
            >
              [ {SHAPES[key].name} ]
            </button>
          ))}
        </div>
      </div>

      {/* Custom Mesh Toolbar (Only visible when + CREATE MESH is active) */}
      {shapeKey === "custom" && (
        <div className="bg-black border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-white/40 uppercase">MODE:</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
                setEditTool("auto");
                setSelectedVertex(null);
              }}
              className={`px-2 py-0.5 border cursor-pointer ${
                editTool === "auto"
                  ? "border-accent-blue text-accent-blue bg-white/5 font-bold"
                  : "border-white/10 text-white/40 hover:text-white"
              }`}
            >
              [ AUTO-CONNECT ]
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
                setEditTool("manual");
                setSelectedVertex(null);
              }}
              className={`px-2 py-0.5 border cursor-pointer ${
                editTool === "manual"
                  ? "border-accent-blue text-accent-blue bg-white/5 font-bold"
                  : "border-white/10 text-white/40 hover:text-white"
              }`}
            >
              [ MANUAL EDGES ]
            </button>
          </div>

          <div className="flex items-center gap-2">
            {historyStack.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUndo();
                }}
                className="text-accent-blue border border-accent-blue/40 px-2 py-0.5 text-[10px] flex items-center gap-1 cursor-pointer hover:bg-white/5"
                title="Undo last action (Ctrl + Z)"
              >
                <Undo2 size={10} />
                <span>UNDO (Ctrl+Z)</span>
              </button>
            )}
            <span className="text-white/30 text-[10px]">
              V: {customVertices.length} | E: {customEdges.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearCustomEdges();
              }}
              className="text-white/40 hover:text-white border border-white/10 px-2 py-0.5 text-[10px] cursor-pointer"
            >
              [ CLEAR EDGES ]
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearCustomMesh();
              }}
              className="text-red-400 hover:text-red-300 border border-red-500/20 px-2 py-0.5 text-[10px] cursor-pointer"
            >
              [ RESET MESH ]
            </button>
          </div>
        </div>
      )}

      {/* Interactive 3D Canvas */}
      <div
        className="w-full h-84 relative cursor-grab active:cursor-grabbing flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Drag / Creation Overlay Hint */}
        <div className="absolute bottom-3 left-4 font-mono text-[10px] text-white/40 tracking-widest pointer-events-none">
          {shapeKey === "custom" ? (
            editTool === "auto"
              ? "CLICK CANVAS TO PLACE & AUTO-CONNECT VERTICES · DRAG TO ROTATE · SCROLL TO ZOOM"
              : selectedVertex !== null
              ? "CLICK A SECOND VERTEX TO DRAW EDGE · DRAG TO ROTATE · SCROLL TO ZOOM"
              : "CLICK A VERTEX TO SELECT FOR MANUAL EDGE · DRAG TO ROTATE · SCROLL TO ZOOM"
          ) : (
            "← DRAG TO ROTATE · SCROLL TO ZOOM →"
          )}
        </div>

        {/* Zoom Controls & Auto Rotate Toggle */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2 font-mono text-[10px]">
          {/* Zoom Buttons */}
          <div className="flex items-center border border-white/10 bg-black/80 text-white/60">
            <button
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
                setZoom((z) => Math.max(0.3, parseFloat((z - 0.2).toFixed(2))));
              }}
              className="p-1 hover:text-white border-r border-white/10 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={12} />
            </button>
            <span className="px-2 text-white/80">{Math.round(zoom * 100)}%</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
                setZoom((z) => Math.min(3.0, parseFloat((z + 0.2).toFixed(2))));
              }}
              className="p-1 hover:text-white border-l border-white/10 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={12} />
            </button>
          </div>

          {/* Auto Rotate Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sfx.playClick();
              setAutoRotate(!autoRotate);
            }}
            className="text-white/40 hover:text-white border border-white/10 px-2 py-1 flex items-center gap-1.5 cursor-pointer bg-black/80"
          >
            <RefreshCw size={10} className={autoRotate ? "animate-spin text-accent-blue" : ""} />
            <span>AUTO-ROTATE: {autoRotate ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasSandbox;

