import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">SafeSpace</Link>
        <div className="nav-links">
          <Link to="/diary" className={isActive('/diary')}>Diary</Link>
          <Link to="/diary/add" className={isActive('/diary/add')}>Add Thought</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
