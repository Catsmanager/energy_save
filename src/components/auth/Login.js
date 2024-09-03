import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios를 사용하여 HTTP 요청을 보냄

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // 스프링 백엔드의 로그인 API로 POST 요청
      const response = await axios.post('/api/auth/login', {
        emailId: email,
        password: password,
      });

      // 로그인 성공 시 처리 (예: 토큰 저장, 페이지 이동 등)
      console.log('로그인 성공:', response.data);
      navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
      
    } catch (error) {
      // 로그인 실패 시 처리
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section id="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;