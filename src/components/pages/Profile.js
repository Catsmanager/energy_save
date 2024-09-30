import React, { useState } from 'react';
import Header from '../../components/Header';
import '../styles/Profile.css';  

function Profile() {
  // 사용자 정보 상태 관리
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');

  // 프로필 이미지 설정
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };


  const handleImageRemove = () => {
    setProfileImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    // 백엔드 연동 후 메시지 설정
    console.log("사용자 정보:", { name, email, profileImage });
    setMessage('프로필이 성공적으로 저장되었습니다!');
  };

  return (
    <div className="profile-container">
      <Header />
      <h2>프로필 설정</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>이름:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>이메일:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>프로필 이미지:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>
        {profileImage && (
          <div className="profile-image-preview">
            <img src={profileImage} alt="프로필 미리보기" className="image-preview" />
            <button type="button" onClick={handleImageRemove} className="remove-image-btn">
              이미지 삭제
            </button>
          </div>
        )}
        <button type="submit" className="submit-btn">저장</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Profile;


