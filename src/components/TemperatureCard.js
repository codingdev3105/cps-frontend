export default function TemperatureCard({ temperature, alert }) {
  return (
    <div className="temperature-card">
      <h3>Température</h3>
      <p className="temp-value">{temperature}°C {alert && '⚠️'}</p>
    </div>
  );
}
