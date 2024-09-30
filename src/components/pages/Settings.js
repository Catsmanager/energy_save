import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import '../styles/Settings.css';

function Settings() {

  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('ko');
  const [theme, setTheme] = useState('light');
  const [message, setMessage] = useState('');


  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setNotifications(savedSettings.notifications);
      setLanguage(savedSettings.language);
      setTheme(savedSettings.theme);
    }
  }, []);

  // 테마 변경 시 body 스타일 업데이트
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#333333';
    document.body.style.color = theme === 'light' ? '#000000' : '#ffffff';
  }, [theme]);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const settings = { notifications, language, theme };
    localStorage.setItem('settings', JSON.stringify(settings)); //로컬에서 불러오는것
    console.log("설정 저장:", settings);
    setMessage('설정이 성공적으로 저장되었습니다!');
  }, [notifications, language, theme]);

  // 알림 설정 
  const toggleNotifications = useCallback(() => {
    setNotifications((prev) => !prev);
  }, []);

  // 언어 변경 
  const handleLanguageChange = useCallback((e) => {
    const { value } = e.target;
    setLanguage(value);
  }, []);

  // 테마 변경
  const handleThemeChange = useCallback((e) => {
    const { value } = e.target;
    setTheme(value);
  }, []);

  // 설정 초기화
  const handleReset = () => {
    setNotifications(true);
    setLanguage('ko');
    setTheme('light');
    localStorage.removeItem('settings');  
    setMessage('설정이 기본값으로 초기화되었습니다.');
  };

  return (
    <div className="settings-container">
      <Header />
      <h2>환경설정</h2>
      <form onSubmit={handleSubmit} className="settings-form">
     
        <div className="form-group">
          <label>
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={toggleNotifications} 
            />
            알림 받기
          </label>
        </div>

    
        {notifications && <p className="notification-preview">[미리보기] 알림을 받을 수 있습니다.</p>}

      
        <div className="form-group">
          <label>언어 설정:</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </select>
        </div>

     
        <div className="form-group">
          <label>테마 설정:</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                value="light" 
                checked={theme === 'light'} 
                onChange={handleThemeChange} 
              />
              라이트 모드
            </label>
            <label>
              <input 
                type="radio" 
                value="dark" 
                checked={theme === 'dark'} 
                onChange={handleThemeChange} 
              />
              다크 모드
            </label>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className={`submit-btn ${theme}`}>저장</button>
          <button type="button" onClick={handleReset} className="reset-btn">초기화</button>
        </div>
      </form>

 
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default Settings;

