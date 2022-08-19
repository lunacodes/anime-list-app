import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import LoginCard from './components/LoginCard';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import NovelPage from './components/NovelPage';
import getNovelsRequest from './services/getNovelsRequest.js';

const Main = () => {
  const [novelsData, setNovelsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNovelData() {
      const data = await getNovelsRequest();
      const novel_data = await Object.values(data);
      await setNovelsData(novel_data);
      setIsLoading(false);
    }
    fetchNovelData();
  }, []);

  return (
    <>
      {!isLoading && novelsData.length > 0 && (
        <Routes>
          <Route path='/' element={<Home novels={novelsData} />} />
          <Route path='/novels' element={<Home novels={novelsData} />} />
            <Route path=':novelSlug' element={<NovelPage novels={novelsData} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LoginCard />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      )}
    </>
  );
};
export default Main;
