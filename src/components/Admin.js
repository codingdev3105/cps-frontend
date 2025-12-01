// src/components/Admin.jsx
import React, { useState, useEffect } from 'react';

// URL du backend – sans espace à la fin !
const API_URL = 'https://cps-backend-snh7.onrender.com';

const Admin = () => {
  const [groupes, setGroupes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const chargerGroupes = async () => {
      try {
        // ✅ Utiliser API_URL + route correcte : /groups (sans "e")
        const reponse = await fetch(`${API_URL}/groups`);
        if (!reponse.ok) throw new Error('Erreur lors du chargement');
        const data = await reponse.json();
        setGroupes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    chargerGroupes();
  }, []);

  const supprimerGroupe = async (nomGroupe) => {
    if (!window.confirm(`Supprimer le groupe "${nomGroupe}" ?`)) return;

    try {
      // ✅ Route correcte : /groups (pas /groupes)
      const reponse = await fetch(`${API_URL}/groups/${nomGroupe}`, {
        method: 'DELETE',
      });

      if (reponse.ok) {
        setGroupes(groupes.filter(g => g !== nomGroupe));
      } else {
        const erreur = await reponse.json().catch(() => ({}));
        alert(`Erreur : ${erreur.error || 'Échec de la suppression'}`);
      }
    } catch (err) {
      alert('Échec de la suppression : ' + err.message);
    }
  };

  if (loading) return <p>Chargement des groupes...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Administration – Gestion des groupes</h2>
      {groupes.length === 0 ? (
        <p>Aucun groupe trouvé.</p>
      ) : (
        <ul>
          {groupes.map((groupe) => (
            <li key={groupe} style={{ margin: '10px 0' }}>
              <strong>{groupe}</strong>
              <button
                onClick={() => supprimerGroupe(groupe)}
                style={{
                  marginLeft: '10px',
                  padding: '4px 8px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>
        <a href="/">← Retour à l'accueil</a>
      </p>
    </div>
  );
};

export default Admin;