import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// URL du backend (à adapter selon ton déploiement)
const API_URL = 'https://cps-backend-snh7.onrender.com';

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/groups`);
      setGroups(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des groupes:', err);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger la liste au montage + toutes les 5 secondes (optionnel, pour temps réel)
  useEffect(() => {
    fetchGroups();
    const interval = setInterval(fetchGroups, 10000);
    return () => clearInterval(interval); // Nettoyage
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenue sur le Dashboard CPS</h1>

      <div className="existing-groups">
        <h2>Groupes actifs :</h2>
        {loading ? (
          <p>Chargement des groupes...</p>
        ) : groups.length === 0 ? (
          <p>Aucun groupe actif pour le moment.</p>
        ) : (
          <div className="groups-list">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => navigate(`/groupe/${group}`)}
                className="group-button"
              >
                {group}
              </button>
            ))}
          </div>
        )}
      </div>

      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        Les groupes sont créés automatiquement par les ESP8266.
      </p>
    </div>
  );
}