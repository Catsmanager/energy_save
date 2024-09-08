import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; 
import CheckList from '../components/main/CheckList';
import './styles/Main.css'; // CSS 파일을 임포트
  
const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <Header/>
      <div className="main-content"> {/* 상단 여백 추가 */}
        <CheckList/>
      </div>
    </div>
  );
};

export default Main;
