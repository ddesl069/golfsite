import React from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function MyNavbar() {
    
    return(
        
        <Navbar bg="light" expand="lg" fixed="top">
        <Container fluid className="justify-content-start justify-content-lg-center">
          <Navbar.Brand as={Link} to="/" className="me-auto me-lg-0">MyGolfScores</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav>
              <Nav.Link as={Link} className='mx-2' to="/pages/articles.js" activeclassName="nav-link" activeClassName="active">Articles</Nav.Link>
              <Nav.Link as={Link} className='mx-2' to="/pages/tournaments.js" activeclassName="nav-link" activeClassName="active">Tournaments</Nav.Link>
              <Nav.Link as={Link} className='mx-2' to="/players" activeclassName="nav-link" activeClassName="active">players</Nav.Link>
              {/* Add more navigation links here */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default MyNavbar;