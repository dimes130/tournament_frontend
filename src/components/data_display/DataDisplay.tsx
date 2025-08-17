import { Team, Coach, Play } from "../../apis/Entities";
import { calculateYearsDifference } from "../helper";
import { useRef, useEffect, useState } from "react";
import basketballBg from "../../assets/basketball_canvas.png";

interface DisplayTeamProp {
    team : Team;
}

interface DisplayCoachProp{
  coach: Coach;
}

interface DisplayPlayProp{
  play: Play;
}

export function DisplayTeams({ team }: DisplayTeamProp){

    return (<div className="stats shadow">
  <div className="stat">
    <div className="stat-figure text-primary">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" 
    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>



    </div>
    <div className="stat-title-black">Team Name</div>
    <div className="stat-value text-primary">{ team.name }</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>


    </div>
    <div className="stat-title-bold">Players</div>
    <div className="stat-value text-secondary">{team.players.length}</div>
  </div>

<div className="stat">
    <div className="stat-figure text-warning">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>




    </div>
    <div className="stat-title-black">Plays Created</div>
    <div className="stat-value text-warning">{ team.plays.length }</div>
  </div>

  <div className="stat">
    <button className="btn btn-primary btn-md py-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>



    </button>
  </div>
</div>);
}

export function DisplayCoachDetails( {coach} : DisplayCoachProp){
  const age = calculateYearsDifference(new Date(coach.dateOfBirth), new Date());

  return(<div className="stats stats-vertical shadow">
    <div className="stat">
      <div className="stat-title">Welcome Back</div>
      <div className="stat-value">Coach {coach.name}</div>
    </div>

    <div className="stat">
      <div className="stat-title">Age</div>
      <div className="stat-value">{ age }</div>
    </div>

    <div className="stat">
      <div className="stat-title">Teams Managed</div>
      <div className="stat-value">{ coach.teams.length }</div>
    </div>
</div>)
}

export function DisplayTeamDetails( { play } : DisplayPlayProp){

  return (<div className="stats shadow">
  <div className="stat">
    <div className="stat-figure text-primary">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" 
    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>



    </div>
    <div className="stat-title-black">Play</div>
    <div className="stat-value text-primary">{ play.name }</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>


    </div>
    <div className="stat-title-bold">Type</div>
    <div className="stat-value text-secondary">{play.playType}</div>
  </div>

<div className="stat">
    <div className="stat-figure text-warning">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>

    </div>
    <div className="stat-title-black">Created At</div>
    <div className="stat-value text-warning">{ new Date(play.createdAt).toLocaleString() }</div>
  </div>


<div className="stat">
    <div className="stat-figure text-warning">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>




    </div>
    <div className="stat-title-black">Last Modified</div>
    <div className="stat-value text-warning">{ new Date(play.modifiedAt).toLocaleString() }</div>
  </div>

  <div className="stat">
    <button className="btn btn-primary btn-md py-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>
    </button>
  </div>
</div>);
}

type DroppedObj = {
  id: string;
  sourceId: string;
  x: number;
  y: number;
  color: string;
  r: number;
  text: string;
};

export default function PlayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objects, setObjects] = useState<DroppedObj[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [placedIds, setPlacedIds] = useState<string[]>([]);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; objectId: string | null } | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const styles = window.getComputedStyle(event.currentTarget);

    const element_data = JSON.stringify({
      id: event.currentTarget.id,
      width: styles.width,
      backgroundColor: styles.backgroundColor,
      text: event.currentTarget.innerText
    });

    event.dataTransfer.setData("application/json", element_data);
  };

  const enableDropping = (event: React.DragEvent) => {
    event.preventDefault();
  };

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

    setObjects(prev => [
      ...prev,
      {
        id: uniqueId,
        sourceId: returned_data.id,
        x: xCanvas,
        y: yCanvas,
        color: returned_data.backgroundColor,
        r,
        text: returned_data.text ?? String(returned_data.id)
      }
    ]);

    setPlacedIds(prev => [...prev, returned_data.id]);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const clicked = objects.find(o => {
      const dx = x - o.x;
      const dy = y - o.y;
      return Math.sqrt(dx * dx + dy * dy) <= o.r;
    });

    if (clicked) {
      setDraggingId(clicked.id);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggingId) return;

    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setObjects(prev =>
      prev.map(o => (o.id === draggingId ? { ...o, x, y } : o))
    );
  };

  const handleCanvasMouseUp = () => {
    setDraggingId(null);
  };

  const handleCanvasRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const clicked = objects.find(o => {
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
    const objToRemove = objects.find(o => o.id === contextMenu.objectId);

    const removedSourceId = objToRemove?.sourceId ?? null;

    setObjects(prev => prev.filter(o => o.id !== contextMenu.objectId));

    if (removedSourceId) {
      setPlacedIds(prev => prev.filter(id => id !== removedSourceId));
    }
  }
  setContextMenu(null);
};

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

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
  }, [objects]);

  return (
    <>
      {/* Save Frame Button */}
      <div style={{ marginBottom: "10px" }}>
        <button
          type="button"
          onClick={() => {
            console.log("Current Frame Data:", objects);
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Save Frame
        </button>
      </div>

      {/* Top row with placeholders */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "1200px",
          marginBottom: "20px",
          userSelect: "none"
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
                alignItems: "center",         // vertically center
                justifyContent: "center",     // horizontally center
                color: "white",               // text color
                fontWeight: "bold",           // bold text
                fontSize: "16px"
              }}
              title={placedIds.includes(String(idx)) ? "Already placed" : "Drag onto the court"}
            >{idx + 1}</div>
          ))}
        </div>

        {/* Middle - Smaller Basketball */}
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
            opacity: placedIds.includes("ball") ? 0.5 : 1
          }}
          title={placedIds.includes("ball") ? "Already placed" : "Drag the basketball onto the court"}
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
                display: "flex",              // center the text
                alignItems: "center",         // vertically center
                justifyContent: "center",     // horizontally center
                color: "white",               // text color
                fontWeight: "bold",           // bold text
                fontSize: "16px"
              }}
              title={placedIds.includes(String(idx + 5)) ? "Already placed" : "Drag onto the court"}
            >{idx + 1}</div>
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
          backgroundSize: "cover"
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
            border: "2px solid black"
          }}
        />

        {/* Custom context menu */}
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
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
            }}
          >
            <div
              onClick={handleRemove}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#eee")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "white")
              }
            >
              Remove
            </div>
          </div>
        )}
      </div>
    </>
  );
}