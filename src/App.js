import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from './components/auth/AuthPage';
import Main from './components/Main';
import ImageUploadCard from './components/card/ImageUploadCard';
import Quiz from './components/pages/Quiz';
import Profile from './components/pages/Profile';
import DailyQuest from './components/pages/DailyQuest';
import BottomNavBar from './components/mobile/BottomNavBar';

const App = () => {
  const [userList, setUserList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태 추가

  useEffect(() => {
    // 초기 인증 상태 확인 (예: 로컬 스토리지에서 토큰 확인)
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
  }, []);

  const location = useLocation();

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/main" element={isAuthenticated ? <Main /> : <Navigate to="/" />} />
        <Route path="/signup" element={<AuthPage userList={userList} setUserList={setUserList} />} />
        <Route path="/*" element={<Main setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quest" element={<DailyQuest />} />
        <Route path="/imageupload" element={<ImageUploadCard />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      {location.pathname !== '/' && <BottomNavBar />}
    </div>
  );
}

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import './App.css';
// // import smooth from "./utils/smooth";
// // import link from "./utils/link";
// import AuthPage from './components/auth/AuthPage';
// import Main from './components/Main';
// import ImageUploadCard from './components/card/ImageUploadCard';
// import Quiz from './components/quiz/Quiz';
// import Profile from './components/pages/Profile';
// import DailyQuest from './components/pages/DailyQuest';
// import BottomNavBar from './components/mobile/BottomNavBar';

// const App = () => {
//   const [userList, setUserList] = useState([]); // userList 상태를 App.js에서 관리

//   useEffect(() => {
//     // smooth();
//     // link();
//   }, []);

//   // 현재 위치 (URL 경로)를 가져오는 hook
//   const location = useLocation();

//   // 로그인된 상태인지 체크하는 함수 추가
//   const isLoggedIn = location.pathname !== '/'; // AuthPage를 제외한 모든 페이지는 로그인 상태로 간주
//   const isAuthenticated = localStorage.getItem('token') !== null;

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<AuthPage />} />
//         <Route path="/main" element={isAuthenticated ? <Main /> : <Navigate to="/" />} />

//         <Route path="/signup" element={<AuthPage userList={userList} setUserList={setUserList} />} />
//         <Route path="/*" element={<Main />} /> {/* 메인 레이아웃 */}
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/quest" element={<DailyQuest />} />
//         <Route path="/imageupload" element={<ImageUploadCard />} />
//         <Route path="/quiz" element={<Quiz />} />
//       </Routes>
//       {/* 로그인 상태일 때만 BottomNavBar를 보여줌 */}
//       {isLoggedIn && <BottomNavBar />}
//     </div>
//   );
// }

// const RootApp = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default RootApp;