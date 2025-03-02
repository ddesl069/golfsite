import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from "./pages/homepage"
import MyNavbar from './navbar';
import Articles from './pages/articles';
import Tournaments from './pages/tournaments';
import 'bootstrap/dist/css/bootstrap.min.css';
import Schedule from './pages/schedule';
import Players from './pages/players';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <MyNavbar/>
      </header>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/pages/articles.js" element={<Articles/>}/>
      <Route path="/pages/tournaments.js" element={<Tournaments/>}/>
      <Route path="/pages/schedule.js" element={<Schedule/>}/>
      <Route path="/pages/players.js" element={<Players/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
