export default function HumidityCircle({ humidity }) {
  const circleStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '10px solid #3498db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '0 auto'
  };

  return (
    <div className="humidity-circle">
      <h3>Humidité</h3>
      <div style={circleStyle}>{humidity}%</div>
    </div>
  );
}
