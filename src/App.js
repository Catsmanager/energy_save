import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import smooth from "./utils/smooth";
import link from "./utils/link";
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Login from './components/auth/Login'; // 경로에 맞게 import
import Main from './components/Main';

const App = () => {
  useEffect(() => {
      smooth();
      link();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




// import React from 'react';
// import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomePage from './components/HomePage';

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Footer />
//       <HomePage />
//       <h1>Camera OCR Capture</h1>
//       <CameraComponent />
//     </div>
//   );
// }

// export default App;
