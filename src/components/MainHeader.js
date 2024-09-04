import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 기능을 가져옵니다.

  const handleMapClick = () => {
    navigate('/map'); // '/map' 경로로 이동
  };

  return (
    <header>
      <h1>Energy Save Challenge</h1>
      <nav>
        <span 
          onClick={handleMapClick} 
          style={{ cursor: 'pointer', color: 'white', marginLeft: '20px' }}>
          Map
        </span>
      </nav>
    </header>
  );
};

export default Header;
