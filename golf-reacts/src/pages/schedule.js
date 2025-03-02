import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'; // Keep styling consistent

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [currentTournament, setCurrentTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const options = {
        method: "GET",
        url: "https://live-golf-data.p.rapidapi.com/schedule",
        params: { orgId: "1", year: "2025" },
        headers: {
          "x-rapidapi-key": "683bef4d35msh9b1813d5e149049p139d2bjsn41ce51809e34",
          "x-rapidapi-host": "live-golf-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data && response.data.schedule) {
          const tournaments = response.data.schedule;
          setSchedule(tournaments);
          determineCurrentTournament(tournaments);
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

  // Determine current or most recent tournament
  const determineCurrentTournament = (tournaments) => {
    const today = new Date();

    let current = null;
    let recent = null;

    tournaments.forEach(tournament => {
      const startDate = new Date(tournament.date?.start);
      const endDate = new Date(tournament.date?.end);

      if (startDate <= today && endDate >= today) {
        current = tournament; // Currently ongoing
      } else if (endDate < today) {
        recent = tournament; // Most recent completed
      }
    });

    setCurrentTournament(current || recent);
  };

  return (
    <div className="main-container">
      <h1>Golf Tournament Schedule 2025</h1>

      {loading && <p>Loading schedule...</p>}
      {error && <p className="error">{error}</p>}

      {currentTournament && (
        <div className="highlighted-tournament">
          <h2>Currently Selected Tournament</h2>
          <h3>{currentTournament.name || "Unknown Tournament"}</h3>
          <p><strong>Start Date:</strong> {currentTournament.date?.start || "TBD"}</p>
          <p><strong>End Date:</strong> {currentTournament.date?.end || "TBD"}</p>
          <p><strong>Format:</strong> {currentTournament.format || "Unknown"}</p>
          <p>
            <strong>Purse:</strong> ${currentTournament.purse ? currentTournament.purse.toLocaleString() : "N/A"}
          </p>
          <p>
            <strong>Winner's Share:</strong> ${currentTournament.winnersShare ? currentTournament.winnersShare.toLocaleString() : "N/A"}
          </p>
          <p><strong>FedEx Cup Points:</strong> {currentTournament.fedexCupPoints || "N/A"}</p>
        </div>
      )}

      <ul>
        {schedule.map((tournament, index) => (
          <li key={index} className="tournament-item">
            <h2>{tournament.name || "Unknown Tournament"}</h2>
            <p><strong>Start Date:</strong> {tournament.date?.start || "TBD"}</p>
            <p><strong>End Date:</strong> {tournament.date?.end || "TBD"}</p>
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




