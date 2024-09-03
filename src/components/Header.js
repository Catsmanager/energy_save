// import React from 'react';
// import { Link } from 'react-router-dom'; // Link를 import

// const Header = () => {
//   return (
//     <header>
//       <h1>This is practice page</h1>
//       <nav>
//         <Link to="/login">Login</Link> 
//         <Link to="/signup">Signup</Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;


import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>This is practice page</h1>
      <nav>
        <a href="#login">Login</a>
        <a href="#signup">Signup</a>
        <a href="#social-login">SocialLogin</a>
      </nav>
    </header>
  );
};

export default Header;

