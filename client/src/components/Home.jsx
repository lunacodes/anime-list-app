import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import getNovelsRequest from '../services/getNovelsRequest.js';

const Home = (props) => {
  const novel_data = props.novels;
  const novels_arr = [];

  novel_data.map((novel) => {
    novels_arr.push(Object.values(novel));
  });

  return <Gallery novels={novel_data} />;
};

export default Home;
