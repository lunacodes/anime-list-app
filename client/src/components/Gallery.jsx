import * as React from 'react';

const Gallery = (props) => {
  const json_data = props.novels;
  const novel_data = Object.keys(json_data).map((key) => [key, json_data[key]]);

  const NovelsDisplay = () =>
    novel_data.map((item) => {
      const data = item[1];
      const id = data.id;
      const novel = data.attributes;
      const title = novel.canonicalTitle;
      const thumbs = [];
      let cover = '';
      thumbs.push(novel.posterImage);

      if (thumbs[0] !== null) {
        cover = thumbs[0]['original'];
      }

      return (
        <div key={id} className='gallery-item' id={`gal-item-${id}`}>
          <img
            src={cover}
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
