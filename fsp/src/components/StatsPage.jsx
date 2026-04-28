import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StatsPage.css';

const StatsPage = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="error-container">
        <p>No player data found.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const networkLevel = Math.floor((Math.sqrt(data.networkExp + 15312.5) - 125 / Math.sqrt(2)) / (25 * Math.sqrt(2)) + 1);

  return (
    <div className="stats-page">
      <header className="stats-header">
        <button onClick={() => navigate('/')} className="back-btn">← New Search</button>
      </header>
      
      <div className="stats-container">
        {/* Left Side: Avatar Card */}
        <aside className="player-card">
            <h2 className="player-name">{data.displayname}</h2>
          <img 
            src={`https://visage.surgeplay.com/full/512/${data.uuid}`} 
            alt="skin" 
            className="player-skin"
          />
        </aside>

        {/* Right Side: Simple Stat Grids */}
        <main className="stats-grid">
          <section className="stat-section">
            <h3>Overview Stats</h3>
            <div className="stat-row"><span>Hypixel Level</span> <span>{networkLevel}</span></div>
            <div className="stat-row"><span>Rank</span> <span>{data.newPackageRank?.replace("_PLUS", "+" || "PLAYER")}</span></div>
            <div className="stat-row"><span>Karma</span> <span>{data.karma?.toLocaleString()}</span></div>
            <div className="stat-row"><span>Achievement Points</span> <span>{data.achievementPoints}</span></div>

          </section>

          <section className="stat-section">
            <h3>BedWars</h3>
            <div className="stat-row"><span>Level</span> <span>{data.achievements.bedwars_level}✫</span></div>
            <div className="stat-row"><span>Finals</span> <span>{data.stats?.Bedwars?.final_kills_bedwars}</span></div>
            <div className="stat-row"><span>Total Solo Games</span> <span>{data.stats?.Bedwars?.eight_one_games_played_bedwars}</span></div>
            <div className="stat-row"><span>Total Doubles Games</span> <span>{data.stats?.Bedwars?.eight_two_games_played_bedwars}</span></div>
            <div className="stat-row"><span>Total Trios Games</span> <span>{data.stats?.Bedwars?.four_three_games_played_bedwars}</span></div>
            <div className="stat-row"><span>Total Quad Games</span> <span>{data.stats?.Bedwars?.four_four_games_played_bedwars}</span></div>
          </section>

          <section className="stat-section">
            <h3>SkyWars</h3>
            <div className="stat-row"><span>Wins</span> <span>{data.stats?.SkyWars?.wins || 0}</span></div>
            <div className="stat-row"><span>Kills</span> <span>{data.stats?.SkyWars?.kills || 0}</span></div>
          </section>

          <section className="stat-section">
            <h3>Skyblock</h3>
                <a 
                href={`https://sky.shiiyu.moe/stats/${data.displayname}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="skycrypt-link"
                >
              View on SkyCrypt ↗
                </a>
          </section>


        </main>
      </div>
    </div>
  );
};

export default StatsPage;