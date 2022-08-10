import React from 'react';

const WebtoonList = (props) => {
  return (
    <>
      {props.webtoons.map((webtoon, index) => (
        <div
          className='image-container d-flex justify-content-start m-3'
          key={index}
        >
          <div>
            {webtoon.title} {webtoon.starScoreAverage}
          </div>
          {/* <MyWebtoonsComponent /> */}
        </div>
      ))}
      ;
    </>
  );
};

export default WebtoonList;
