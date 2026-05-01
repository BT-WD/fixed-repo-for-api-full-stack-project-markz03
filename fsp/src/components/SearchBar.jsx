import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';

const API_KEY = "223638ec-df9f-49cb-b24d-7cfddf28302b";

const SearchBar = ({ setPlayerData }) => {
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Load history on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hypixel_history")) || [];
    setHistory(saved);
  }, []);

  const saveHistory = (name) => {
    // FIX: Use the functional update (prevHistory) to ensure we always have the latest list
    setHistory((prevHistory) => {
      const cleaned = [
        name, 
        ...prevHistory.filter(h => h.toLowerCase() !== name.toLowerCase())
      ].slice(0, 5);
      
      localStorage.setItem("hypixel_history", JSON.stringify(cleaned));
      return cleaned;
    });
  };

  const fetchData = async (name) => {
    if (!name || !name.trim()) return;
    setLoading(true);
    
    try {
      // 1. Get UUID (using ashcon app which handles CORS better)
      const mRes = await fetch(`https://api.ashcon.app/mojang/v2/user/${name.trim()}`);
      if (!mRes.ok) throw new Error("Minecraft player not found.");
      
      const mData = await mRes.json();
      const uuid = mData.uuid;

      // 2. Get Hypixel Player Data
      const hRes = await fetch(`https://api.hypixel.net/player?key=${API_KEY}&uuid=${uuid}`);
      const hData = await hRes.json();

      if (hData.success && hData.player) {
        setPlayerData(hData.player); // Update global state
        saveHistory(mData.username); // Save to local history
        navigate('/stats');          // Change page
      } else {
        alert("This player has never joined Hypixel!");
      }
    } catch (err) {
      console.error("Search Error:", err);
      alert(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-section">
      <form 
        className="searchWrapper" 
        onSubmit={(e) => { 
          e.preventDefault(); 
          fetchData(username); 
        }}
      >
        <input
          type="text"
          placeholder="Enter Minecraft Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "..." : <FaSearch />}
        </button>
      </form>

      {history.length > 0 && (
        <div className="history-container">
          <span>Recent:</span>
          {history.map((name, i) => (
            <button 
              key={i} 
              type="button" 
              onClick={() => {
                setUserName(name); // Optional: show name in bar when clicked
                fetchData(name);
              }} 
              className="history-tag"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;