import React, {useState} from 'react';
import {FaSearch} from "react-icons/fa"
import './SearchBar.css'

const SearchBar = ({ setSearchQuery }) => {
  const [username, setUserName] = useState("")
  const fetchData = (value) => {
    fetch()
  }

  const handleChange = (value) => {
    setUserName(value)
    fetchData(value)
  }

  return (
    <div className="searchWrapper">
      <input
        type="text"
        placeholder="Enter player username"
        value={username}
        onChange={(e) => setSearchQuery(e.target.value)} 
        style={{ width: '400px', height: '28px', fontSize: '18px' }} 

      />
      <FaSearch id="search-icon" />
    </div>
  );
};

export default SearchBar;