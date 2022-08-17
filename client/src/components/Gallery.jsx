import React from 'react';
import stringToSlug from '../services/stringToSlug.js';
import { Link } from 'react-router-dom';

const Gallery = (props) => {
  const novel_data = props.novels;

  const NovelsDisplay = () =>
    novel_data.map((item, index) => {
      const id = `${index}-${item.title}`;
      const title = item.title;
      const poster = item.poster;
      const slug = stringToSlug(title);

      return (
        <div key={id} className='gallery-item'>
          <Link to={slug}>
            <img
              src={poster}
              alt={title}
              className='gallery-img'
              width='266'
              height='400'
            />
            <h3>{title}</h3>
          </Link>
        </div>
      );
    });

  return (
    <div className='gallery'>
      <NovelsDisplay />
    </div>
  );
};

export default Gallery;
