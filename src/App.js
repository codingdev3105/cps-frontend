import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HumidityCircle from './components/HumidityCircle';
import TemperatureCard from './components/TemperatureCard';
import './App.css';

export default function App() {
  const { groupe } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`https://cps-backend-ten.vercel.app/logs/${groupe}`);
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 2000);
    return () => clearInterval(interval);
  }, [groupe]);

  const lastLog = logs[logs.length - 1] || { temperature: '-', humidity: 0, alert: false };

  return (
    <div className="dashboard">
      <div className="left-panel">
        <h2>Dashboard Groupe {groupe}</h2>
        <HumidityCircle humidity={lastLog.humidity} />
        <TemperatureCard temperature={lastLog.temperature} alert={lastLog.alert} />
      </div>

      <div className="right-panel">
        <h3>Logs</h3>
        <div className="logs">
          {logs.length === 0 && <p>Aucune donnée reçue.</p>}
          {logs.map((log, idx) => (
            <div key={idx} className="log-item">
              <strong>{new Date(log.date).toLocaleTimeString()}</strong> - Temp: {log.temperature}°C - Hum: {log.humidity}% {log.alert ? '⚠️ Alerte' : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
