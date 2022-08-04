import React from 'react';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const WebtoonList = (props: any) => {
  // const MyWebtoonsComponent = props.MyWebtoonsComponent;

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return (
    <>
      {props.webtoons.map((webtoon: any, index: any) => (
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
