/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import stringToSlug from '../services/stringToSlug.js';
import { Link } from 'react-router-dom';

const Gallery = ({ novels }) => {
  const novel_data = novels;

  const NovelsDisplay = () => {
    if (novel_data.length > 0) {
      return novel_data.map((item, index) => {
        const id = `${item.title}-${index}`;
        const title = item.title;
        const poster = item.poster;
        const slug = stringToSlug(title);

        return (
          <div key={id} className='gallery-item'>
            <Link to={`/novels/${slug}`}>
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
    }

    return <div>There are no novels that match that search</div>;
  };

  return (
    <>
      <div className='gallery'>
        <NovelsDisplay />
      </div>
    </>
  );
};

Gallery.propTypes = {
  novels: PropTypes.array,
};

export default Gallery;
