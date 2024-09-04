import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import SocialLogin from './auth/SocialLogin';
import Header from './Header';


const HomePage = () => {
  const navigate = useNavigate(); // navigate 함수 호출

  const handleSignupClick = () => {
    navigate('/signup'); // '/signup' 경로로 이동
  };

  return (
    <main>
      <Header />
      <Login />
      <p>계정이 없으신가요?</p>
      <button onClick={handleSignupClick}>Sign Up</button>
      <SocialLogin />
    </main>
  );
};

export default HomePage;


// import React, { useState } from 'react';
// import Signup from './auth/Signup';
// import Login from './auth/Login';
// import SocialLogin from './auth/SocialLogin';
// import Header from './Header';


// const HomePage = () => {
//   const [userList, setUserList] = useState([]);

//   return (
//     <main>
//       <Header />
//       <Login />
//       <Signup userList={userList} setUserList={setUserList} />
//       <SocialLogin />
//     </main>
//   );
// };

// export default HomePage;
