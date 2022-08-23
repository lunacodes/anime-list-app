import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Login from '../components/Login';
import Logout from '../components/Logout';
import NovelPage from '../components/NovelPage';
import getNovelsRequest from '../services/getNovelsRequest.js';

const GenerateRoutes = ({ novelsData }) =>  {
  const novel_data = novelsData;
  const novels_arr = [];

  novel_data.map((novel) => {
    novels_arr.push(Object.values(novel));
  });


	return (
		<>
		<Routes>
			<Route path='/' element={<Home novels={novelsData} />} />
			<Route path='/novels' element={<Home novels={novelsData} />} />
				<Route path=':novelSlug' element={<NovelPage novels={novelsData} />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/login' element={<Login />} />
			<Route path='/logout' element={<Logout />} />
		</Routes>
		</>
	)
}

GenerateRoutes.propTypes = {
  novelsData: PropTypes.array,
};


export default GenerateRoutes;