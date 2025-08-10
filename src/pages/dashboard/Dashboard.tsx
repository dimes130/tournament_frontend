import { Fragment, useEffect, useState } from 'react'
import { DisplayTeams, DisplayCoachDetails} from '../../components/data_display/DataDisplay';
import { useParams } from 'react-router';
import { Team } from '../../apis/Entities';

function Dashboard(){
    const [data, setData] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const { coach_id } = useParams();

    useEffect(() => {
        if (!coach_id) return;
        const fetchDashboard = async() =>  {
        try{
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/api/v1/coach/${coach_id}/dashboard`, {
            method: "GET",
            headers: {"Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            }
          })
          const json = await res.json();

          if(res.ok){
           setData(json); 
          }

          setLoading(false);

        }

        catch(error){
            console.log(error);
        }
        }
        fetchDashboard();
        }, []);


        return (
        <div className="space-y-4 p-6">
          {data.map(team => (
            <DisplayTeams key={team.team_id} team={team} />
          ))}
        </div>
        );


    }

export default Dashboard;