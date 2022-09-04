import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChangeText }) => {
	React.useEffect(() => {
		let input = document.querySelector('input');
		input.addEventListener('input', onChangeText);

		return input.removeEventListener('input', onChangeText);
	}, []);

	return (
		<div className='search-container'>
			<input
				type='text'
				value={value}
				onChange={onChangeText}
				placeholder='Search light novels by name'
			/>
		</div>
	);
};

SearchBar.propTypes = {
	value: PropTypes.string,
	onChangeText: PropTypes.func,
};

export default SearchBar;
