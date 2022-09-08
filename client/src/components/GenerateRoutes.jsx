import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import AnimePage from './AnimePage';
import PageNotFound from './PageNotFound';
import Register from './Register';
import BoardUser from './BoardUser';

const GenerateRoutes = ({ animesData }) => {
  const anime_data = animesData;
  const animes_arr = [];

  anime_data.map((anime) => {
    animes_arr.push(Object.values(anime));
  });

  return (
    <>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route exact path={'/'} element={<Home animes={animesData} />} />
        <Route path='animes'>
          <Route index element={<Home animes={animesData} />} />
          <Route
            path=':animeSlug'
            element={<AnimePage animes={animesData} />}
          />
        </Route>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route
          exact
          path='/profile'
          element={<Profile animes={animesData} />}
        />
        <Route path='/user' element={<BoardUser />} />
      </Routes>
    </>
  );
};

GenerateRoutes.propTypes = {
  animesData: PropTypes.array,
};

export default GenerateRoutes;
