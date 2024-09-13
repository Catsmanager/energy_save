import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './main/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // PC용 CSS
import './mobile/Header.css'; // 모바일용 CSS
function Header() {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    navigate('/profile');
  };

  return (
    <div>
      {/* PC에서만 보이는 헤더 */}
      <header className="app-header pc-header d-none d-md-flex">
        <div className="header-content">
          <Sidebar /> {/* 사이드바 컴포넌트 사용 */}
          <div className="header-icons">
            <i className="fas fa-bell"></i> {/* 알림 아이콘 */}
            <i
              className="fas fa-user"
              onClick={handleUserIconClick}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
        </div>
      </header>

      {/* 모바일에서만 보이는 헤더 */}
      <header className="app-header mobile-header d-flex d-md-none">
        <div className="header-content">
          <h1 className="logo-title">
            <span>Energy</span>
            <i className="fas fa-bolt logo-icon"></i> {/* 번개 아이콘 */}
            <span> Save</span>
          </h1>
          <div className="header-icons">
            <i className="fas fa-bell"></i> {/* 알림 아이콘 */}
            <i
              className="fas fa-user"
              onClick={handleUserIconClick}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;