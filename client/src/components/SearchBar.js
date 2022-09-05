import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onChangeText }) => {
	return (
		<div className='container-fluid search-container'>
			<input
				type='text'
				onChange={onChangeText}
				placeholder='Search light novels by name'
			/>
		</div>
	);
};

SearchBar.propTypes = {
	onChangeText: PropTypes.func,
};

export default SearchBar;
