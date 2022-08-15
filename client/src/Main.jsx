import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Logout from './components/Logout';
import getNovelsRequest from './services/getNovelsRequest.js';
import stringToSlug from './services/stringToSlug.js';

const Main = () => {
  const [novelsData, setNovelsData] = useState();
  const [slugsList, setSlugsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [novels, setNovels] = useState([]);
  let slugsArr = [];

  useEffect(() => {
    async function fetchNovelData() {
      const data = await getNovelsRequest();
      const novel_data = await Object.values(data);
      await setNovelsData(novel_data);

      const slugs = await data.map((novel) => {
        const title = stringToSlug(novel.title);
        slugsArr.push(title);
        setSlugsList(slugsArr);

        setIsLoading(false);
      });
    }
    fetchNovelData();
  }, []);

  return (
    <>
      {!isLoading && (
        <Routes>
          <Route path='/' element={<Home novels={novelsData} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      )}
    </>
  );
};
export default Main;
