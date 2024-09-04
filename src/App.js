import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import smooth from "./utils/smooth";
import link from "./utils/link";
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Main from './components/Main';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ImageUploadCard from './components/card/ImageUploadCard';

const App = () => {
  const [userList, setUserList] = useState([]); // userList 상태를 App.js에서 관리

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
          <Route path="/signup" element={<Signup userList={userList} setUserList={setUserList} />} />
          <Route path="/main" element={<Main />} />
          <Route path="/imageupload" element={<ImageUploadCard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
