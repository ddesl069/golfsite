import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

function MyNavbar() {
    const location = useLocation(); // Get current route

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container fluid className="justify-content-start justify-content-lg-center">
                <Navbar.Brand as={Link} to="/pages/homepage.js" className="me-auto me-lg-0">MyGolfScores</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-center">
                    <Nav>
                        {/* Show Homepage button ONLY if NOT on Homepage */}
                        {location.pathname !== "/pages/homepage.js" && (
                            <Nav.Link as={Link} className='mx-2' to="/pages/homepage.js">Homepage</Nav.Link>
                        )}
                        <Nav.Link as={Link} className='mx-2' to="/pages/articles.js">Articles</Nav.Link>
                        <Nav.Link as={Link} className='mx-2' to="/pages/tournaments.js">Tournaments</Nav.Link>
                        <Nav.Link as={Link} className='mx-2' to="/pages/schedule.js">Schedule</Nav.Link>
                        <Nav.Link as={Link} className='mx-2' to="/pages/players.js">Players</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
