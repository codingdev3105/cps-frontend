import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export default function Home() {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const res = await axios.get('https://cps-backend-ten.vercel.app/groups');
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const createGroup = async () => {
    if (!groupName) return;
    try {
      await axios.post('https://cps-backend-ten.vercel.app/groups', { name: groupName });
      setGroupName('');
      fetchGroups();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="home-container">
      <h1>Bienvenue sur le Dashboard CPS</h1>

      <div className="create-group">
        <h2>Créer un nouveau groupe :</h2>
        <div className="create-input">
          <input 
            type="text" 
            placeholder="Nom du groupe"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
          <button onClick={createGroup}>Créer</button>
        </div>
      </div>

      <div className="existing-groups">
        <h2>Groupes existants :</h2>
        <div className="groups-list">
          {groups.map(g => (
            <button key={g} onClick={() => navigate(`/groupe/${g}`)}>
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
