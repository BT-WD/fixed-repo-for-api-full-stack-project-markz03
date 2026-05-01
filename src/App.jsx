import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import StatsPage from './components/StatsPage';
import './App.css';

function App() {
  const [playerData, setPlayerData] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <h1>Hypixel Stats Viewer</h1>
        <Routes>
          <Route 
            path="/" 
            element={<SearchBar setPlayerData={setPlayerData} />} 
          />
          <Route 
            path="/stats" 
            element={<StatsPage data={playerData} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;