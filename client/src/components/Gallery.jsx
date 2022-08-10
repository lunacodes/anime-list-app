import * as React from 'react';

const Gallery = (props) => {
  const novel_data = props.novels;

  const NovelsDisplay = () =>
    novel_data.map((item) => {
      console.log(item);
      const id = item.id;
      const title = item.title;
      const poster = item.poster;

      return (
        <div key={id} className='gallery-item' id={`gal-item-${id}`}>
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
