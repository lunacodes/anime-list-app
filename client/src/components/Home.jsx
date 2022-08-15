import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import getNovelsRequest from '../services/getNovelsRequest.js';

const Home = (props) => {
  const novel_data = props;
  const novels = Object.values(novel_data);

  return <Gallery novels={novels} />;
};

export default Home;
