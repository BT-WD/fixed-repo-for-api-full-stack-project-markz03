import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';


const API_KEY = "3904a47b-d206-41eb-8ad3-0c76201841f5";

const SearchBar = ({ setPlayerData }) => {
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      // 1. Get UUID from Mojang (using a more reliable public proxy for browsers)
      const mojangRes = await fetch(`https://api.ashcon.app/mojang/v2/user/${username.trim()}`);
      
      if (!mojangRes.ok) {
        alert("Minecraft player not found. Check the spelling!");
        setLoading(false);
        return;
      }

      const mojangData = await mojangRes.json();
      const uuid = mojangData.uuid.replace(/-/g, ""); // Hypixel prefers UUIDs without dashes

      // 2. Get Stats from Hypixel
      // IMPORTANT: Use the variable name API_KEY (all caps) to match the definition above
      const hypixelRes = await fetch(
        `https://api.hypixel.net/player?key=${API_KEY}&uuid=${uuid}`
      );
      const hypixelData = await hypixelRes.json();

      console.log("Hypixel API Response:", hypixelData); // Debugging tool

      if (hypixelData.success && hypixelData.player) {
        setPlayerData(hypixelData.player);
        navigate('/stats');
      } else if (hypixelData.success && !hypixelData.player) {
        alert("This player exists in Minecraft but has never logged into Hypixel.");
      } else {
        alert(`Hypixel API Error: ${hypixelData.cause || "Unknown Error"}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Network error. The API might be down or your key is invalid.");
    }
    setLoading(false);
  };

  return (
    <form className="searchWrapper" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter player username..."
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? "..." : <FaSearch />}
      </button>
    </form>
  );
};

export default SearchBar;