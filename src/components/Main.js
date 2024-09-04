import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import Header from './MainHeader';

const Main = () => {
  const navigate = useNavigate(); // navigate 훅

  const handleUploadClick = () => {
    navigate('/imageupload'); // '/upload' 경로로 이동
  };

  return (
    <main>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>대중 교통 후불 카드 인증</p>
        <button 
          onClick={handleUploadClick} 
          style={{ marginLeft: '20px', cursor: 'pointer' }}>
          업로드
        </button>
      </div>
    </main>
  );
};

export default Main;

// import React, { useState } from 'react';
// import Header from './MainHeader';
// import ImageUploadCard from './card/ImageUploadCard'; 

// const Main = () => {
//   const [showUpload, setShowUpload] = useState(false); // 이미지 업로드 컴포넌트 표시 여부

//   const handleUploadClick = () => {
//     setShowUpload(true); // 버튼 클릭 시 이미지 업로드 컴포넌트 표시
//   };

//   return (
//     <main>
//       <Header />
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <p>대중 교통 후불 카드 인증</p>
//         <button 
//           onClick={handleUploadClick} 
//           style={{ marginLeft: '20px', cursor: 'pointer' }}>
//           업로드
//         </button>
//       </div>
//       {showUpload && <ImageUploadCard />} {/* 업로드 버튼 클릭 시 이미지 업로드 컴포넌트 표시 */}
//     </main>
//   );
// };

// export default Main;
