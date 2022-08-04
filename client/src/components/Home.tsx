import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import axios from 'axios';

const Home: React.FC = () => {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const [novels, setNovels] = useState([] as unknown);

  const getNovelsRequest = async () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:3001/fetch',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.request(options).then((response) => {
      console.log(response);
      const data = response.data;
      console.log(data);

      setNovels(data);
    });
  };

  useEffect(() => {
    getNovelsRequest();
  }, []);

  return <Gallery />;
};

export default Home;
