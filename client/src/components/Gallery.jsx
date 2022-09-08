/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import stringToSlug from '../services/stringToSlug.js';
import { Link } from 'react-router-dom';

const Gallery = ({ animes }) => {
  const anime_data = animes;

  const AnimesDisplay = () => {
    if (anime_data.length > 0) {
      return anime_data.map((item, index) => {
        const id = `${item.title}-${index}`;
        const title = item.title;
        const poster = item.poster;
        const slug = stringToSlug(title);

        return (
          <div key={id} className='gallery-item'>
            <Link to={`/animes/${slug}`}>
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

    return <div>There are no animes that match that search</div>;
  };

  return (
    <>
      <div className='gallery'>
        <AnimesDisplay />
      </div>
    </>
  );
};

Gallery.propTypes = {
  animes: PropTypes.array,
};

export default Gallery;
