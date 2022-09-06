import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import NovelPage from './NovelPage';
import PageNotFound from './PageNotFound';
import Register from './Register';
import BoardUser from './BoardUser';

const GenerateRoutes = ({ novelsData }) => {
  const novel_data = novelsData;
  const novels_arr = [];

  novel_data.map((novel) => {
    novels_arr.push(Object.values(novel));
  });

  return (
    <>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route exact path={'/'} element={<Home novels={novelsData} />} />
        <Route path='novels'>
          <Route index element={<Home novels={novelsData} />} />
          <Route
            path=':novelSlug'
            element={<NovelPage novels={novelsData} />}
          />
        </Route>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route
          exact
          path='/profile'
          element={<Profile novels={novelsData} />}
        />
        <Route path='/user' element={<BoardUser />} />
      </Routes>
    </>
  );
};

GenerateRoutes.propTypes = {
  novelsData: PropTypes.array,
};

export default GenerateRoutes;
