import React from 'react';
import './BottomNavBar.css';
import { useNavigate } from 'react-router-dom';

function BottomNavBar() {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate('/main')}>
        <i className="fas fa-home"></i>
      </button>
      <button onClick={() => navigate('/map')}>
        <i className="fas fa-map"></i>
      </button>
      <button onClick={() => navigate('/quest')}>
        <i className="fas fa-tree"></i>
      </button>
      <button onClick={() => navigate('/bars')}>
        <i className="fas fa-bars"></i>
      </button>
    </nav>
  );
}

export default BottomNavBar;