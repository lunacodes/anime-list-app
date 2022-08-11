import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';

const Home = () => {
  const [novels, setNovels] = useState([]);

  const getNovelsRequest = async () => {
    const options = {
      method: 'GET',
      mode: 'cors',
      url: 'http://localhost:3001/fetch',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let novels_data = [];

    const data = await fetch(options.url, {
        'method': 'GET',
        'mode:': 'cors',
        'headers':  {
      'content-type': 'application/json',
    }});
    const data2 = await data.json();
    data2.data.map((item) => {
      const novel = item.attributes;
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
    // console.log(data2.data);
  };

  useEffect(() => {
    getNovelsRequest();
  }, []);

  return <Gallery novels={novels} />;
};

export default Home;
