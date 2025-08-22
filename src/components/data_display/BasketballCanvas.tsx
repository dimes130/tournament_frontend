import { useState, useRef, useEffect } from "react";
import basketballBg from "../../assets/basketball_canvas.png";
import { useParams } from "react-router";

type DroppedObj = {
  id: string;
  sourceId: string;
  x: number;
  y: number;
  color: string;
  r: number;
  text: string;
};

async function createFrame(objects: DroppedObj[], play_id: string | undefined) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/plays/${play_id}/frames`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ snapshot_data: JSON.stringify(objects) }),
    });

    console.log("Creating frame with objects:", objects);

    if (!res.ok) throw new Error(`Failed to create frame`);
    console.log("Frame created!");
  } catch (error) {
    console.log(error);
  }
}

export default function PlayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { play_id } = useParams();

  // frames: each frame holds its own array of DroppedObj
  const [frames, setFrames] = useState<DroppedObj[][]>([[]]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; objectId: string | null } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const objects = frames[currentFrameIndex] || [];
  const placedIds = objects.map((o) => o.sourceId);

  /** ----------------- Frame Management ----------------- */
  const addFrame = () => {
    setFrames((prev) => {
      const copy = [...prev];
      const copiedObjects = objects.map((o) => ({ ...o })); // deep copy
      return [...copy, copiedObjects];
    });
    setCurrentFrameIndex(frames.length);
  };

  const saveFrame = async () => {
    await createFrame(objects, play_id);
    console.log("Saved frame to backend");
  };

  const playFrames = () => {
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= frames.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentFrameIndex(i);
      }
    }, 1000);
  };

  /** ----------------- Drag + Drop ----------------- */
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const styles = window.getComputedStyle(event.currentTarget);
    const element_data = JSON.stringify({
      id: event.currentTarget.id,
      width: styles.width,
      backgroundColor: styles.backgroundColor,
      text: event.currentTarget.innerText,
    });
    event.dataTransfer.setData("application/json", element_data);
  };

  const enableDropping = (event: React.DragEvent) => event.preventDefault();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const raw = event.dataTransfer.getData("application/json");
    const returned_data = JSON.parse(raw);

    if (placedIds.includes(returned_data.id)) return;

    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const xCanvas = (event.clientX - rect.left) * scaleX;
    const yCanvas = (event.clientY - rect.top) * scaleY;
    const r = parseInt(returned_data.width, 10) / 2;
    const uniqueId = returned_data.id + "-" + Date.now();

    const newObj: DroppedObj = {
      id: uniqueId,
      sourceId: returned_data.id,
      x: xCanvas,
      y: yCanvas,
      color: returned_data.backgroundColor,
      r,
      text: returned_data.text ?? String(returned_data.id),
    };

    setFrames((prev) => {
      const copy = [...prev];
      copy[currentFrameIndex] = [...objects, newObj];
      return copy;
    });
  };

  /** ----------------- Dragging Objects ----------------- */
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const clicked = objects.find((o) => {
      const dx = x - o.x;
      const dy = y - o.y;
      return Math.sqrt(dx * dx + dy * dy) <= o.r;
    });

    if (clicked) setDraggingId(clicked.id);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggingId) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setFrames((prev) => {
      const copy = [...prev];
      copy[currentFrameIndex] = copy[currentFrameIndex].map((o) =>
        o.id === draggingId ? { ...o, x, y } : o
      );
      return copy;
    });
  };

  const handleCanvasMouseUp = () => setDraggingId(null);

  /** ----------------- Right-click Remove ----------------- */
  const handleCanvasRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const clicked = objects.find((o) => {
      const dx = x - o.x;
      const dy = y - o.y;
      return Math.sqrt(dx * dx + dy * dy) <= o.r;
    });

    if (clicked) {
      setContextMenu({ x: e.clientX, y: e.clientY, objectId: clicked.id });
    } else {
      setContextMenu(null);
    }
  };

  const handleRemove = () => {
    if (contextMenu?.objectId) {
      setFrames((prev) => {
        const copy = [...prev];
        copy[currentFrameIndex] = copy[currentFrameIndex].filter((o) => o.id !== contextMenu.objectId);
        return copy;
      });
    }
    setContextMenu(null);
  };

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  /** ----------------- Canvas Drawing ----------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== 1200 * dpr || canvas.height !== 712 * dpr) {
      canvas.width = 1200 * dpr;
      canvas.height = 712 * dpr;
      canvas.style.width = "1200px";
      canvas.style.height = "712px";
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, 1200, 712);
    for (const o of objects) {
      ctx.beginPath();
      ctx.arc(o.x / dpr, o.y / dpr, o.r, 0, Math.PI * 2);
      ctx.fillStyle = o.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = `${o.r}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(o.text || "", o.x / dpr, o.y / dpr);
    }
  }, [objects, currentFrameIndex]);

  /** ----------------- UI ----------------- */
  return (
    <>
      {/* Frame controls */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <button onClick={addFrame} style={{ padding: "8px 16px", backgroundColor: "#FF9800", color: "white", border: "none", borderRadius: "4px" }}>
          Add Frame
        </button>Canvas
        <button onClick={saveFrame} style={{ padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
          Save Frame
        </button>
        <button onClick={playFrames} disabled={isPlaying} style={{ padding: "8px 16px", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "4px" }}>
          Play
        </button>
        {frames.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentFrameIndex(idx)}
            style={{
              padding: "6px 10px",
              borderRadius: "4px",
              border: idx === currentFrameIndex ? "2px solid blue" : "1px solid gray",
              backgroundColor: idx === currentFrameIndex ? "#e3f2fd" : "white",
            }}
          >
            Frame {idx + 1}
          </button>
        ))}
      </div>

      {/* Top row (players + ball) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "1200px",
          marginBottom: "20px",
          userSelect: "none",
        }}
      >
        {/* Left side - 5 red */}
        <div style={{ display: "flex", gap: "10px" }}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              id={String(idx)}
              key={`red-${idx}`}
              draggable={!placedIds.includes(String(idx))}
              onDragStart={handleDragStart}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "red",
                borderRadius: "50%",
                border: "2px solid black",
                cursor: placedIds.includes(String(idx)) ? "not-allowed" : "grab",
                opacity: placedIds.includes(String(idx)) ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Middle - ball */}
        <div
          id="ball"
          draggable={!placedIds.includes("ball")}
          onDragStart={handleDragStart}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "orange",
            borderRadius: "50%",
            border: "2px solid black",
            cursor: placedIds.includes("ball") ? "not-allowed" : "grab",
            opacity: placedIds.includes("ball") ? 0.5 : 1,
          }}
        />

        {/* Right side - 5 green */}
        <div style={{ display: "flex", gap: "10px" }}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              id={String(idx + 5)}
              key={`green-${idx}`}
              draggable={!placedIds.includes(String(idx + 5))}
              onDragStart={handleDragStart}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "green",
                borderRadius: "50%",
                border: "2px solid black",
                cursor: placedIds.includes(String(idx + 5)) ? "not-allowed" : "grab",
                opacity: placedIds.includes(String(idx + 5)) ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Court & Canvas */}
      <div
        onDragOver={enableDropping}
        onDrop={handleDrop}
        style={{
          position: "relative",
          width: "1200px",
          height: "712px",
          backgroundImage: `url(${basketballBg})`,
          backgroundSize: "cover",
        }}
      >
        <canvas
          ref={canvasRef}
          width={600 * 2}
          height={356 * 2}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onContextMenu={handleCanvasRightClick}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            border: "2px solid black",
          }}
        />
        {contextMenu && (
          <div
            style={{
              position: "fixed",
              top: contextMenu.y,
              left: contextMenu.x,
              background: "white",
              border: "1px solid black",
              borderRadius: "4px",
              zIndex: 1000,
            }}
          >
            <div onClick={handleRemove} style={{ padding: "8px 12px", cursor: "pointer" }}>
              Remove
            </div>
          </div>
        )}
      </div>
    </>
  );
}
