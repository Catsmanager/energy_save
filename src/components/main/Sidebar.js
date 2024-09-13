import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div className="sidebar">
      <h1 className="logo-title">
        <span>Energy</span>
        <i className="fas fa-bolt logo-icon"></i> {/* 번개 아이콘 */}
        <span>Save</span>
      </h1>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/main')}>
          <i className="fas fa-home"></i>
          home
        </li>
        <li onClick={() => navigate('/calender')}>
          <i className="fas fa-calendar"></i> 
          Calendar
        </li>
        <li><a href="#about">About</a></li>
        <li><a href="#settings">Contact</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
