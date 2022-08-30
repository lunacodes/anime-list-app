import React from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';

const Home = ({ novels }) => {
	const novel_data = novels;
	const novels_arr = [];

	novel_data.map((novel) => {
		novels_arr.push(Object.values(novel));
	});

	return (
		<div className='container-fluid'>
			<Gallery novels={novel_data} />
		</div>
	);
};

Home.propTypes = {
	novels: PropTypes.array,
};

export default Home;
