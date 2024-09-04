import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅을 가져옵니다.

const Signup = ({ userList, setUserList }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 기능을 가져옵니다.

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 이메일 중복 체크
      const emailCheckResponse = await axios.post('http://localhost:8080/api/auth/check/email', {
        emailId: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (emailCheckResponse.data.exists) {
        setError('이메일이 이미 존재합니다.');
        return;
      }

      // 사용자 데이터 객체 생성
      const newUser = {
        emailId: email,
        username: name,
        password
      };

      // JSON 형식으로 서버에 데이터 전송
      await axios.post('http://localhost:8080/api/auth/signup', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // 성공적으로 가입한 경우
      setUserList([...userList, newUser]);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      
    } catch (error) {
      console.error('가입 중 오류 발생:', error);
      setError('가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  
    // 회원가입 후 홈페이지로 이동
    navigate('/');
  };

  return (
    <section id="signup">
      <h2>회원가입</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signup-name">이름:</label>
          <input
            type="text"
            id="signup-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-email">이메일:</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-password">비밀번호:</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">비밀번호 확인:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
};

export default Signup;
