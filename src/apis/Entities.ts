export interface Coach{
    coach_id : number;
    name : string;
    teams : Team[];
    dateOfBirth : string;
}

export interface Player {
    player_id : number;
    name : string;
    feet : number;
    inches : number;
    dateOfBirth : string;
    team : Team;
}

export interface Team {
  team_id: number;
  name: string;
  players: Player[];
  coach: Coach;
  plays: Play[];
}

export type PlayType = 'OFFENSE' | 'DEFENSE'| '';

export interface Play {
    play_id : number;
    name : string;
    team : Team;
    playType : PlayType;
    createdAt : string;
    modifiedAt : string;
    frames : Frame[];
}

export interface Frame{
    frame_id : number;
    frame_number : number;
    snapshotData : string;
    play : Play;
    createdAt : string;
    modifiedAt : string;
}
