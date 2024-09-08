import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  // 사용자 아이콘 클릭 시 profile 페이지로 이동하는 함수
  const handleUserIconClick = () => {
    navigate('/profile');
  };

  return (
    <header className="app-header">
    <div className="header-logo">
      <h1 className="logo-title">
        <span>Energy</span>
        <i className="fas fa-bolt logo-icon"></i> {/* 번개 아이콘 */}
        <span>Save</span>
      </h1>
    </div>
    <div className="header-icons">
      <i className="fas fa-bell"></i> {/* 알림 아이콘 */}
      <i 
        className="fas fa-user" 
        onClick={handleUserIconClick} 
        style={{ cursor: 'pointer' }}
      ></i>
    </div>
    </header>
  );
}

export default Header;


// <div className="header-search">
//         <input type="text" placeholder="Search..." />
//       </div>