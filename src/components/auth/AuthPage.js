import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../auth/AuthPage.css'; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 상태 관리
  const [email, setEmail] = useState(''); // 이메일 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [repeatPassword, setRepeatPassword] = useState(''); // 비밀번호 확인 상태
  const [username, setUsername] = useState(''); // 회원가입을 위한 사용자 이름 상태
  const [error, setError] = useState(''); // 에러 메시지 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        emailId: email,
        password: password,
      });

      //console.log('로그인 성공:', response.data);
      navigate('/main', { state: { email } });
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 회원가입 처리 함수
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      // 이메일 중복 체크
      const emailCheckResponse = await axios.post('/api/auth/check/email', {
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
        username: username,
        password: password
      };

      // JSON 형식으로 서버에 데이터 전송
      await axios.post('/api/auth/signup', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('회원가입 성공:', newUser);
      setIsLogin(true); // 회원가입 성공 시 로그인 폼으로 전환
      setError(''); // 에러 메시지 초기화
    } catch (error) {
      console.error('회원가입 실패:', error.response ? error.response.data : error.message);
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        {/* 소셜 로그인 영역 */}
        <div className="social-login">
          {/* login with 텍스트를 소셜 버튼 위쪽에 살짝 왼쪽으로 배치 */}
          <p className="login-with-text" style={{ marginBottom: '30px', marginLeft: '-200px' , fontWeight: 'bold' }}>
            {isLogin ? 'Login with' : 'Register with'}
          </p>
          
          <div className="social-buttons">
            <button className="social-button instagram-button">
              <i className="fab fa-instagram"></i>
            </button>
            <button className="social-button google-button">
              <i className="fab fa-google"></i>
            </button>
            <button className="social-button github-button">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </div>

        {/* 분리선 */}
        <div className="or-separator">
          <span>or</span>
        </div>

        {/* 로그인 폼 */}
        <div className="login-form">
          <div className="sign-in-htm" style={{ display: isLogin ? 'block' : 'none' }}>
            <form onSubmit={handleLogin}>
              <div className="group">
                <label htmlFor="login-email" className="label"></label>
                <input
                  id="login-email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="group">
                <label htmlFor="login-password" className="label"></label>
                <input
                  id="login-password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="group">
                <input id="check" type="checkbox" className="check" defaultChecked />
                <label htmlFor="check"><span className="icon"></span> 암호 기억하기</label>
              </div>
              <div className="group">
                <input type="submit" className="button" value="LOGIN" />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
            </form>

                    <div className="foot-lnk">
              <p>
                계정이 없나요?{' '}
                <span
                  onClick={() => setIsLogin(false)}
                  style={{ color: '#42b846', cursor: 'pointer' }}
                >
                  Create Account
                </span>
              </p>
              {/* 한 줄 띄우기 */}
              <br />
              <p>
                <span
                  onClick={() => navigate('/search_email')}
                  style={{ color: 'black', cursor: 'pointer', marginRight: '10px' }}
                >
                  이메일을 잊었나요?
                </span>
                /
                <span
                  onClick={() => navigate('/search_password')}
                  style={{ color: 'black', cursor: 'pointer', marginLeft: '10px' }}
                >
                  비밀번호를 잊었나요?
                </span>
              </p>
            </div>
          </div>

          {/* 회원가입 폼 */}
          <div className="sign-up-htm" style={{ display: !isLogin ? 'block' : 'none' }}>
            <form onSubmit={handleSignup}>
              <div className="group">
                <label htmlFor="signup-username" className="label"></label>
                <input
                  id="signup-username"
                  type="text"
                  className="input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="group">
                <label htmlFor="signup-email" className="label"></label>
                <input
                  id="signup-email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="group">
                <label htmlFor="signup-password" className="label"></label>
                <input
                  id="signup-password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="group">
                <label htmlFor="repeat-password" className="label"></label>
                <input
                  id="repeat-password"
                  type="password"
                  className="input"
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                />
              </div>
              <div className="group">
                <input type="submit" className="button" value="Sign Up" />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
            </form>

            <div className="foot-lnk">
              <p>이미 계정이 있나요? <span onClick={() => setIsLogin(true)} style={{ color: '#42b846', cursor: 'pointer' }}>Sign In</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;