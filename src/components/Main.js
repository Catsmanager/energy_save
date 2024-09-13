import { Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calender';
import DailyQuest from './pages/DailyQuest';
import Settings from './pages/Settings';
import './styles/Main.css';  
import Header from '../components/Header'; 
import Sidebar from './main/Sidebar';

function Main() {
  const navigate = useNavigate();
  const location = useLocation(); // 로그인 성공 후 email을 전달받기 위한 useLocation 사용
  const email = location.state?.email; // 로그인 성공 시 email을 전달받음

  return (
    <div className="main-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <Routes>
            <Route path="home" element={<Home/>} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="dailyquest" element={<DailyQuest />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Main;