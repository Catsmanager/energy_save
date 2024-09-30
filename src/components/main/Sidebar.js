import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);

  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token'); // 토큰을 먼저 가져옴
    
    fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      credentials: 'include' 
    })
    .then(response => {
        if (response.ok) {
            localStorage.removeItem('token');
            navigate('/');
        } else {
            console.error('Failed to logout'); // 에러 메시지 확인
        }
    })
    .catch(error => {
        console.error('Logout error: ', error); // 여기서 에러 로그 확인
    });
  };

  return (
    <div className="sidebar">
      <h1 className="logo-title">
        <span>Energy</span>
        <i className="fas fa-bolt logo-icon"></i>
        <span>Save</span>
      </h1>
      <ul className="sidebar-menu">
        <li
          className={active === '/home' ? 'active' : ''}
          onClick={() => handleNavigation('/home')}>
          <i className="fas fa-home"></i> Home
        </li>
        <li
          className={active === '/calendar' ? 'active' : ''}
          onClick={() => handleNavigation('/calendar')}>
          <i className="fas fa-calendar-alt"></i> Calendar
        </li>
        <li
          className={active === '/map' ? 'active' : ''}
          onClick={() => handleNavigation('/map')}>
          <i className="fas fa-map"></i> Map
        </li>
        <li
          className={active === '/dailyquest' ? 'active' : ''}
          onClick={() => handleNavigation('/dailyquest')}>
          <i className="fas fa-list-ul"></i> DailyQuest
        </li>
        <li
          className={active === '/settings' ? 'active' : ''}
          onClick={() => handleNavigation('/settings')}>
          <i className="fas fa-cogs"></i> Settings
        </li>
        <li
          className="sidebar-item" 
          onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Sidebar.css';

// function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [active, setActive] = useState(location.pathname);

//   useEffect(() => {
//     // 페이지가 변경될 때 active 상태를 업데이트
//     setActive(location.pathname);
//   }, [location]);

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="sidebar">
//       <h1 className="logo-title">
//         <span>Energy</span>
//         <i className="fas fa-bolt logo-icon"></i> {/* 번개 아이콘 */}
//         <span>Save</span>
//       </h1>
//       <ul className="sidebar-menu">
//         <li
//           className={active === '/home' ? 'active' : ''}
//           onClick={() => handleNavigation('/home')}>
//           <i className="fas fa-home"></i> Home
//         </li>
//         <li
//           className={active === '/calendar' ? 'active' : ''}
//           onClick={() => handleNavigation('/calendar')}>
//           <i className="fas fa-calendar-alt"></i> Calendar
//         </li>
//         <li
//           className={active === '/map' ? 'active' : ''}
//           onClick={() => handleNavigation('/map')}>
//           <i className="fas fa-map"></i> Map
//         </li>
//         <li
//           className={active === '/dailyquest' ? 'active' : ''}
//           onClick={() => handleNavigation('/dailyquest')}>
//           <i className="fas fa-list-ul"></i> DailyQuest
//         </li>
//         <li
//           className={active === '/settings' ? 'active' : ''}
//           onClick={() => handleNavigation('/settings')}>
//           <i className="fas fa-cogs"></i> Settings
//         </li>
//         <li
//           className={active === '/ logout' ? 'active' : ''}
//           onClick={()=> handleNavigation('/')}>
//           <i className="fas fa-sign-out-alt"></i> Logout
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;
