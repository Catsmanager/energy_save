import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h1 className="logo-title">
        <span>Energy</span>
        <i className="fas fa-bolt logo-icon"></i> {/* 번개 아이콘 */}
        <span>Save</span>
      </h1>
      <ul className="sidebar-menu">
      <li onClick={() => navigate('/main/home')}>
        <i className="fas fa-home"></i> Home
      </li>
      <li onClick={() => navigate('/main/calendar')}>
        <i className="fas fa-calendar-alt"></i> Calendar
      </li>
      <li onClick={() => navigate('/main/dailyquest')}>
        <i className="fas fa-calendar-alt"></i> DailyQuest
      </li>
      <li onClick={() => navigate('/main/settings')}>
        <i className="fas fa-cogs"></i> Settings
      </li>
    </ul>
    </div>
  );
}

export default Sidebar;
