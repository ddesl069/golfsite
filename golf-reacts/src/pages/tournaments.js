import React, { useState, useEffect } from "react";
import axios from "axios";

const Tournaments = () => {
  const [currentTournament, setCurrentTournament] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentTournament = async () => {
        try {
          setLoading(true);
          setError(null);
      
          const today = new Date();
      
          // ✅ Fetch the Schedule
          const scheduleResponse = await axios.get(
            "https://live-golf-data.p.rapidapi.com/schedule",
            {
              params: { orgId: "1", year: "2025" },
              headers: {
                "x-rapidapi-key": "683bef4d35msh9b1813d5e149049p139d2bjsn41ce51809e34",
                "x-rapidapi-host": "live-golf-data.p.rapidapi.com",
              },
            }
          );
      
          if (!scheduleResponse.data || !scheduleResponse.data.schedule) {
            throw new Error("No schedule data available.");
          }
      
          console.log("Schedule API Response:", scheduleResponse.data); // Debugging
      
          const tournaments = scheduleResponse.data.schedule
            .filter((t) => t.date?.start && t.date?.end) // ✅ Ensure valid dates
            .map((t) => ({
              ...t,
              year: scheduleResponse.data.year, // ✅ Set the year from the API response
              startDate: new Date(t.date.start),
              endDate: new Date(t.date.end),
            }));
      
          // ✅ Find the most relevant tournament
          let current = tournaments.find((t) => today >= t.startDate && today <= t.endDate);
          if (!current) {
            const pastTournaments = tournaments.filter((t) => today > t.endDate);
            pastTournaments.sort((a, b) => b.endDate - a.endDate);
            current = pastTournaments[0] || null;
          }
          if (!current) {
            const upcomingTournaments = tournaments.filter((t) => today < t.startDate);
            upcomingTournaments.sort((a, b) => a.startDate - b.startDate);
            current = upcomingTournaments[0] || null;
          }
      
          if (!current) {
            throw new Error("No tournaments found.");
          }
      
          console.log("Selected Tournament:", current);
          setCurrentTournament(current);
      
          // ✅ Fetch the leaderboard only if the tournament has started
          if (today >= current.startDate) {
            const leaderboardResponse = await axios.get(
              "https://live-golf-data.p.rapidapi.com/leaderboard",
              {
                params: { orgId: "1", tournId: current.tournId, year: current.year },
                headers: {
                  "x-rapidapi-key": "683bef4d35msh9b1813d5e149049p139d2bjsn41ce51809e34",
                  "x-rapidapi-host": "live-golf-data.p.rapidapi.com",
                },
              }
            );
      
            if (!leaderboardResponse.data || !leaderboardResponse.data.leaderboardRows) {
              throw new Error("No leaderboard data available.");
            }
      
            setLeaderboard(leaderboardResponse.data.leaderboardRows);
          }
        } catch (error) {
          setError(error.message);
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      

    fetchCurrentTournament();
  }, []);

  return (
    <div>
      <h1>Tournaments</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {currentTournament && (
        <div>
          <h2>{currentTournament.name}</h2>
          <p>Year: {currentTournament.year}</p>
          <p>Status: {currentTournament.status}</p>
          <p>Format: {currentTournament.format}</p>
          <p>Start Date: {currentTournament.startDate ? currentTournament.startDate.toLocaleDateString() : "N/A"}</p>
          <p>End Date: {currentTournament.endDate ? currentTournament.endDate.toLocaleDateString() : "N/A"}</p>
          <p>FedEx Cup Points: {currentTournament.fedexCupPoints}</p>
          <p>Purse: ${currentTournament.purse ? currentTournament.purse.toLocaleString() : "N/A"}</p>
        </div>
      )}

      <h2>Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <ul>
          {leaderboard.map((player) => (
            <li key={player.playerId}>
              {player.position}. {player.firstName} {player.lastName} - {player.total}
            </li>
          ))}
        </ul>
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
};

export default Tournaments;






 

