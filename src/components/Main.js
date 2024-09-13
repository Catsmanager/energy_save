// Main.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header'; 
import CheckList from '../components/main/CheckList';
import './styles/Main.css'; // CSS 파일을 임포트

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 로그인 성공 후 email을 전달받기 위한 useLocation 사용
  const email = location.state?.email; // 로그인 성공 시 email을 전달받음

  return (
    <div className="main-page">
      <Header />
      <div className="main-content">
        <CheckList email={email} /> 
      </div>
    </div>
  );
};

export default Main;
