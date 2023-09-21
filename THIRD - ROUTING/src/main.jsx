import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import About from './About.jsx'
import Sortlist from './Sortlist.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Link to="/app" style={{marginRight: 20}}>App page</Link>
      <Link to="/about" style={{marginRight: 20}}>About</Link>
      <Link to="/sort">Sort</Link>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/sort" element={<Sortlist />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
