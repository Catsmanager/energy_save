import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // JWT 디코딩을 위한 라이브러리
import '../styles/Calendar.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date()); // 현재 날짜 관리
  const [checkedDates, setCheckedDates] = useState(new Set());
  const [email, setEmail] = useState(""); // 이메일 상태 추가

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // JWT 디코딩
        setEmail(decodedToken.sub); // sub에서 이메일 상태에 저장
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
        navigate('/'); // 토큰이 유효하지 않으면 로그인 페이지로 리디렉트
        return;
      }
    } else {
      navigate('/'); // 토큰이 없으면 로그인 페이지로 리디렉트
      return;
    }

    // 이메일이 설정되면 체크인 날짜를 가져오는 함수 실행
    const fetchCheckedDates = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/attendance/all/${email}`);
        const dates = response.data.map(record => record.date);
        setCheckedDates(new Set(dates));
      } catch (error) {
        console.error('Failed to fetch checked-in dates', error);
      }
    };

    if (email) {
      fetchCheckedDates(); // email이 설정된 경우에만 fetchCheckedDates 호출
    }
  }, [email, navigate]);
  
  const handleCheckInToday = async () => {
    const today = new Date();
    const todayStr = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())).toISOString().split('T')[0];
  
    // 현재 날짜가 체크된 날짜에 포함되어 있는지 확인
    if (checkedDates.has(todayStr)) {
      alert('이미 출석 했습니다.');
      return; // 이미 출석한 경우, 함수 종료
    }
  
    try {
      // 체크인 요청 데이터 출력
      console.log('Check-in Request:', {
        email: email,
        date: todayStr
      });
  
      // 오늘 날짜에 대한 체크인 요청
      const response = await axios.post('http://localhost:8080/api/attendance/check-in', {
        email: email,
        date: todayStr
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      // 응답 데이터 출력
      console.log('Check-in Response:', response.data);
  
      // 체크된 날짜 상태 업데이트
      setCheckedDates(prevCheckedDates => new Set(prevCheckedDates).add(todayStr));
      alert('출석 완료!');
    } catch (error) {
      console.error('Failed to save check-in', error);
    }
  };
  
  const renderCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const weeks = [];
    let days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day)).toISOString().split('T')[0];
      days.push(
        <td key={day} className="day">
          {day}
          {checkedDates.has(dayStr) && (
            <div className="award-icon">
              <i className="fas fa-seedling"></i>
            </div>
          )}
        </td>
      );
    
      if ((firstDay + day) % 7 === 0) {
        weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
        days = [];
      }
    }

    if (days.length > 0) {
      weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
    }

    return weeks;
  };

  return (
    <div className="calendar">
      <div className="header">
        <span className="month-year">
          {currentDate.getFullYear()}년 {currentDate.toLocaleDateString('ko-KR', { month: 'long' })} 출석체크 
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
      {/* 출석하기 버튼을 달력 아래로 이동 */}
      <div className="check-in-container">
        <button className="check-in-button" onClick={handleCheckInToday}>
          <i className="fas fa-stamp"></i> 출석하기
        </button>
      </div>
    </div>
  );
};

export default Calendar;
