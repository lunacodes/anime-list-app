import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import axios from 'axios';

const Home = () => {
  const [novels, setNovels] = useState([]);

  const getNovelsRequest = async () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:3001/fetch',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.request(options).then((response) => {
      const data = response.data.data;

      setNovels(data);
    });
  };

  useEffect(() => {
    getNovelsRequest();
  }, []);

  return <Gallery novels={novels} />;
};

export default Home;
