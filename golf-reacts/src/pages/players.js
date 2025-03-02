import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Keep styling consistent

function Players() {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rankingsType, setRankingsType] = useState('fedex'); // Default to FedEx Cup

    const fetchStandings = async () => {
        setLoading(true);
        setError(null);
        
        const API_URL = 'https://live-golf-data.p.rapidapi.com/stats';
        const statId = rankingsType === 'fedex' ? '02671' : '186'; // 02671 for FedEx, 186 for World Rankings

        try {
            const response = await axios.get(API_URL, {
                params: {
                    year: '2025',
                    statId: statId 
                },
                headers: {
                    'x-rapidapi-key': '683bef4d35msh9b1813d5e149049p139d2bjsn41ce51809e34',
                    'x-rapidapi-host': 'live-golf-data.p.rapidapi.com'
                }
            });

            if (response.data && response.data.rankings) {
                setStandings(response.data.rankings);
            } else {
                setError('No standings data available');
            }
        } catch (err) {
            setError('Error fetching standings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStandings();
    }, [rankingsType]); // Re-fetch data when rankingsType changes

    return (
        <div className="schedule-container">
            <h1>{rankingsType === 'fedex' ? 'FedEx Cup Standings' : 'World Rankings'}</h1>

            {/* Toggle Button */}
            <button 
                className="toggle-btn"
                onClick={() => setRankingsType(rankingsType === 'fedex' ? 'world' : 'fedex')}
            >
                {rankingsType === 'fedex' ? 'Switch to World Rankings' : 'Switch to FedEx Cup'}
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && standings.length > 0 && (
                <table className="standings-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Total Points</th>
                            {rankingsType === 'world' && <th>Avg Points</th>} {/* Show Avg Points in World Rankings */}
                            {rankingsType === 'world' && <th>Events Played</th>} {/* Show Events Played */}
                            {rankingsType === 'fedex' && (
                                <>
                                    <th>Wins</th>
                                    <th>Top 10 Finishes</th>
                                    <th>Points Behind</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((player, index) => (
                            <tr key={index}>
                                <td>{player.rank}</td>
                                <td>{player.firstName} {player.lastName}</td>
                                <td>{player.totalPoints}</td>
                                {rankingsType === 'world' && <td>{player.avgPoints}</td>} {/* Show Avg Points */}
                                {rankingsType === 'world' && <td>{player.events}</td>} {/* Show Events Played */}
                                {rankingsType === 'fedex' && (
                                    <>
                                        <td>{player.numWins}</td>
                                        <td>{player.numTop10s}</td>
                                        <td>{player.pointsBehind}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Players;



