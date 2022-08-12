import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import getNovelsRequest from '../services/getNovelsRequest.js';

const Home = () => {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    async function fetchNovelData() {
      const data = await getNovelsRequest();
      const novel_data = await Object.values(data);
      await setNovels(novel_data);
    }
    fetchNovelData();
  }, []);

  return <Gallery novels={novels} />;
};

export default Home;
