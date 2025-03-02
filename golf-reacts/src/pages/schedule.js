import React, { useState, useEffect } from "react";
import axios from "axios";

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const options = {
        method: "GET",
        url: "https://live-golf-data.p.rapidapi.com/schedule",
        params: { orgId: "1", year: "2025" },
        headers: {
          "x-rapidapi-key": "683bef4d35msh9b1813d5e149049p139d2bjsn41ce51809e34", // Replace with your actual API key
          "x-rapidapi-host": "live-golf-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data && response.data.schedule) {
          setSchedule(response.data.schedule); // Store schedule data
        } else {
          throw new Error("No schedule data available.");
        }
      } catch (error) {
        setError("Failed to fetch schedule.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="schedule-container">
      <h1>Golf Tournament Schedule 2024</h1>

      {loading && <p>Loading schedule...</p>}
      {error && <p className="error">{error}</p>}

      <ul>
        {schedule.map((tournament, index) => (
          <li key={index} className="tournament-item">
            <h2>{tournament.name || "Unknown Tournament"}</h2>
            <p><strong>Start Date:</strong> {tournament.date?.start || "TBD"}</p>
            <p><strong>Format:</strong> {tournament.format || "Unknown"}</p>
            <p>
              <strong>Purse:</strong> ${tournament.purse ? tournament.purse.toLocaleString() : "N/A"}
            </p>
            <p>
              <strong>Winner's Share:</strong> ${tournament.winnersShare ? tournament.winnersShare.toLocaleString() : "N/A"}
            </p>
            <p><strong>FedEx Cup Points:</strong> {tournament.fedexCupPoints || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;



