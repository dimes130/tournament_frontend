import { Team, Coach } from "../../apis/Entities";
import { calculateYearsDifference } from "../helper";
import { useRef } from "react";
import basketballBg from "../../assets/basketball_canvas.png"; // default import — correct

interface DisplayTeamProp {
    team : Team;
}

interface DisplayCoachProp{
  coach: Coach;
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

export default function PlayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div
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
        style={{ position: "absolute", top: 0, left: 0, border: "2px solid black"}}
      />
    </div>
  );
}