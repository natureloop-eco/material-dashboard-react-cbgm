import React, { useEffect, useState } from "react";

function SensorCard() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/server/getReadings"); // Catalyst endpoint
      const data = await res.json();
      if (data.length > 0) {
        setLatest(data[0]); // latest reading
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (!latest) return <p>Loading...</p>;

  return (
    <div className="card">
      <h3>Office Room Sensor</h3>
      <p><strong>Temperature:</strong> {latest.temperature} °C</p>
      <p><strong>Humidity:</strong> {latest.humidity} %</p>
      <p><small>Updated: {latest.timestamp}</small></p>
    </div>
  );
}

export default SensorCard;
