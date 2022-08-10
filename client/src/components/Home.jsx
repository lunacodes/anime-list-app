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

    let novels_data = [];

    axios.request(options).then((response) => {
      const res_data = response.data.data;

      res_data.map((data) => {
        const novel = data.attributes;
        const title = novel.canonicalTitle;
        const thumbs = [];
        let poster = '';
        thumbs.push(novel.posterImage);

        if (thumbs[0] !== null) {
          poster = thumbs[0]['original'];
        }

        const n_dat = {
          id: data.id,
          title: title,
          poster: poster,
          averageRating: novel.averageRating,
          description: novel.description,
          startDate: novel.startDate,
          endDate: novel.endDate,
          subtype: novel.subtype,
          synopsis: novel.synopsis,
          status: novel.status,
          tba: novel.tba,
          totalLength: novel.totalLength,
        };

        novels_data.push(n_dat);
      });

      setNovels(novels_data);
    });
  };

  useEffect(() => {
    getNovelsRequest();
  }, []);

  return <Gallery novels={novels} />;
};

export default Home;
