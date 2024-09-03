import React, { useState } from 'react';
const Main = () => {
  return (
    <main>
      <h2>Welcome to the Main Page</h2>
      <p>This is the main page after login.</p>
    </main>
  );
};
// const Main = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (status) => {
//     setIsLoggedIn(status);
//   };

//   return (
//     <main>
//       {isLoggedIn ? (
//         <p>로그인 되었습니다.</p>
//       ) : (
//         <>
//           <Login onLogin={handleLogin} />
//         </>
//       )}
//     </main>
//   );
// };

export default Main;
