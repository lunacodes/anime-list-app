import React from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';

const Home = ({ animes }) => {
	const anime_data = animes;
	const animes_arr = [];

	anime_data.map((anime) => {
		animes_arr.push(Object.values(anime));
	});

	return (
		<div className='container-fluid'>
			<Gallery animes={anime_data} />
		</div>
	);
};

Home.propTypes = {
	animes: PropTypes.array,
};

export default Home;
