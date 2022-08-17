import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';
import getNovelsRequest from '../services/getNovelsRequest.js';

const Home = ({ novels }) => {
  const novel_data = novels;
  const novels_arr = [];

  novel_data.map((novel) => {
    novels_arr.push(Object.values(novel));
  });

  return <Gallery novels={novel_data} />;
};

Home.propTypes = {
  novels: PropTypes.array,
};

export default Home;
