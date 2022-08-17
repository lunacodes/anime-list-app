import React from 'react';
import { useParams } from 'react-router-dom';

const NovelPage = (props) => {
  let params = useParams();
  const novel_data = props.novels;
  console.log(novel_data);

  return <div>This is a novel page for {params.novelSlug}</div>;
};

export default NovelPage;
