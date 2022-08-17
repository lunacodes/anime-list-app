import React from 'react';

const Gallery = (props) => {
  const novel_data = props.novels[0];

  const NovelsDisplay = () =>
    novel_data.map((item, index) => {
      const id = `${index}-${item.title}`;
      const title = item.title;
      const poster = item.poster;

      return (
        <div key={id} className='gallery-item'>
          <img
            src={poster}
            alt={title}
            className='gallery-img'
            width='266'
            height='400'
          />
          <h3>{title}</h3>
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
