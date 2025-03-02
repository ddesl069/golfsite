import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Homepage() {
    const [topPlayers, setTopPlayers] = useState([]);
    const [upcomingTournaments, setUpcomingTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopPlayers();
        fetchUpcomingTournaments();
    }, []);

    // Fetch FedExCup Standings
    const fetchTopPlayers = async () => {
        try {
            const response = await axios.get('https://live-golf-data.p.rapidapi.com/stats', {
                params: {
                    year: '2025',
                    statId: '02671' // FedEx Cup Standings
                },
                headers: {
                    'x-rapidapi-key': '683bef4d35msh9b1813d5e149049p139d2bjsn41ce51809e34',
                    'x-rapidapi-host': 'live-golf-data.p.rapidapi.com'
                }
            });

            if (response.data && response.data.rankings) {
                setTopPlayers(response.data.rankings.slice(0, 3)); // Show top 3 players
            }
        } catch (err) {
            setError('Failed to fetch player rankings');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Upcoming Tournaments
    const fetchUpcomingTournaments = async () => {
        try {
            const response = await axios.get('https://live-golf-data.p.rapidapi.com/schedule', {
                params: { orgId: '1', year: '2025' },
                headers: {
                    'x-rapidapi-key': '683bef4d35msh9b1813d5e149049p139d2bjsn41ce51809e34',
                    'x-rapidapi-host': 'live-golf-data.p.rapidapi.com'
                }
            });

            if (response.data && response.data.schedule) {
                const today = new Date();
                const upcoming = response.data.schedule.filter(tournament => {
                    const startDate = new Date(tournament.date?.start);
                    return startDate >= today;
                });

                setUpcomingTournaments(upcoming.slice(0, 3)); // Show next 3 tournaments
            }
        } catch (err) {
            setError('Failed to fetch tournament schedule');
        }
    };

    return (
        <div className="homepage-container">
            {/* Hero Banner */}
            <section className="hero-banner">
                <h1>Welcome to MyGolfScores</h1>
                <p>Your source for the latest golf scores, news, and rankings.</p>
            </section>

            {/* Featured Tournament */}
            <section className="featured-tournament">
                <h2>🏆 Featured Tournament</h2>
                <div className="tournament-card">
                    <h3>The Masters</h3>
                    <p>April 11-14, 2025 - Augusta National</p>
                    <a href="/pages/tournaments.js" className="btn">View Details</a>
                </div>
            </section>

            {/* Latest Articles */}
            <section className="latest-articles">
                <h2>📰 Latest Articles</h2>
                <div className="article-list">
                    <div className="article-card">
                        <h3>How Scottie Scheffler Dominated 2025</h3>
                        <p>A deep dive into his incredible performance this season.</p>
                        <a href="/pages/articles.js">Read More</a>
                    </div>
                    <div className="article-card">
                        <h3>Top 10 Golf Courses to Play in 2025</h3>
                        <p>Check out the best golf courses around the world.</p>
                        <a href="/pages/articles.js">Read More</a>
                    </div>
                </div>
            </section>

            {/* FedExCup Standings Preview */}
            <section className="fedex-standings">
                <h2>🏅 FedExCup Standings</h2>
                {loading && <p>Loading standings...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && (
                    <>
                        {topPlayers.map((player, index) => (
                            <p key={index}>
                                {player.rank}. {player.firstName} {player.lastName} - {player.totalPoints} pts
                            </p>
                        ))}
                        <a href="/pages/players.js" className="btn">See Full Standings</a>
                    </>
                )}
            </section>

            {/* Upcoming Tournaments */}
            <section className="upcoming-tournaments">
                <h2>📅 Upcoming Tournaments</h2>
                {loading && <p>Loading schedule...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && (
                    <ul>
                        {upcomingTournaments.map((tournament, index) => (
                            <li key={index}>
                                {tournament.name} - {tournament.date?.start}
                            </li>
                        ))}
                    </ul>
                )}
                <a href="/pages/schedule.js" className="btn">View Full Schedule</a>
            </section>
        </div>
    );
}

export default Homepage;

