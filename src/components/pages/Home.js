import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckList from '../main/CheckList';

function Calendar() {
   const location = useLocation(); // 로그인 성공 후 email을 전달받기 위한 useLocation 사용
   const email = location.state?.email; // 로그인 성공 시 email을 전달받음

  return (
    <div className="main-content">
         <CheckList email={email} /> 
    </div>
  );
}

export default Calendar;


