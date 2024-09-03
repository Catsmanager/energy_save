import React, { useState } from 'react';
import Signup from './auth/Signup';
import Login from './auth/Login';
import SocialLogin from './auth/SocialLogin';
import Header from './Header';


const HomePage = () => {
  const [userList, setUserList] = useState([]);

  return (
    <main>
      <Header />
      <Login />
      <Signup userList={userList} setUserList={setUserList} />
      <SocialLogin />
    </main>
  );
};

export default HomePage;



// import React, { useState } from 'react';
// import Login from './auth/Login';
// import Signup from './auth/Signup';
// import SocialLogin from './auth/SocialLogin';

// const HomePage = () => {
//   const [userList, setUserList] = useState([]);

//   return (
//     <main>
//       <Login />
//       <Signup userList={userList} setUserList={setUserList} />
//       <SocialLogin />
//     </main>
//   );
// };

// export default HomePage;