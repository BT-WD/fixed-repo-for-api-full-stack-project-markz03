import { useState } from 'react'

import './App.css'
import SearchBar from './components/SearchBar.jsx'

function App() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <div className='App'>
      <h1>Hypixel Stats Viewer</h1>
       <SearchBar setSearchQuery={setSearchQuery} />
    </div>
  )
}

export default App
