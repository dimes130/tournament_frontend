import { Fragment, useEffect, useState } from 'react'
import { DisplayTeamDetails} from '../../components/data_display/DataDisplay';
import { useParams } from 'react-router';
import { Play } from '../../apis/Entities';
import { StartPlayButton } from '../../components/buttons/Buttons';
import { CreatePlayModal } from '../../components/inputs/Input';

export default function TeamDashboard(){
    const [data, setData] = useState<Play[]>([]);
    const [loading, setLoading] = useState(true);
    const { team_id } = useParams();

    useEffect(() => {
        if (!team_id) return;
        const fetchTeamDashboard = async() =>  {
        try{
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/api/v1/team/${team_id}/plays`, {
            method: "GET",
            headers: {"Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            }
          })
          const json = await res.json();

          if(res.ok){
           setData(json); 
           console.log(json);
          }

        }

        catch(error){
            console.log(error);
        }
        }
        fetchTeamDashboard();
        }, []);

    return(
    <Fragment>
    <CreatePlayModal/>
    <div className="space-y-4 p-6">
              {data.map(play => (
                <DisplayTeamDetails key={play.play_id} play={play} />
              ))}
            </div>
    </Fragment>);
}