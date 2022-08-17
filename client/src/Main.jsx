import React, { useState, useEffect } from 'react';
import { Routes, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Logout from './components/Logout';
import NovelPage from './components/NovelPage';
import getNovelsRequest from './services/getNovelsRequest.js';
import stringToSlug from './services/stringToSlug.js';
// import GeneratedRoutes from './components/Routes';

const Main = () => {
  const [novelsData, setNovelsData] = useState();
  const [slugsList, setSlugsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let routesArr = [];

  useEffect(() => {
    async function fetchNovelData() {
      const data = await getNovelsRequest();
      const novel_data = await Object.values(data);
      await setNovelsData(novel_data);
      setIsLoading(false);
    }
    fetchNovelData();
  }, []);

  const slugPaths = [{ id: 1, path: 'test' }];

  return (
    <>
      {!isLoading && novelsData.length > 0 && (
        <Routes>
          <Route path='/' element={<Home novels={novelsData} />} />
          <Route path='/novels' element={<Home novels={novelsData} />} />
            <Route path=':novelSlug' element={<NovelPage novels={novelsData} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      )}
    </>
  );
};
export default Main;
