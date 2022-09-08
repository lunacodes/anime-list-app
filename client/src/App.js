import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import AuthService from './services/authService';
import getAnimesRequest from './services/animeService';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import GenerateRoutes from './components/GenerateRoutes';
import EventBus from './common/EventBus';

const App = () => {
	const [currentUser, setCurrentUser] = useState(undefined);
	const [animesQueryStr, setAnimesQueryStr] = useState('');
	const [animesData, setAnimesData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	// Search Bar Functions & Effects
	const changeHandler = (event) => {
		setAnimesQueryStr(event.target.value);
	};

	const debouncedChangeHandler = useMemo(
		() => debounce(changeHandler, 300),
		[animesQueryStr]
	);
	// Stop the invocation of the debounced function
	// after unmounting
	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel();
		};
	}, []);

	// Anime Data Effect
	useEffect(() => {
		async function fetchAnimeData() {
			const data = await getAnimesRequest(animesQueryStr);
			const anime_data = await Object.values(data);
			await setAnimesData(anime_data);
			setIsLoading(false);
		}
		fetchAnimeData();
	}, [animesQueryStr]);

	// User Auth function & Effects
	useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setCurrentUser(user);
		}

		EventBus.on('logout', () => {
			logOut();
		});

		return () => {
			EventBus.remove('logout');
		};
	}, []);

	const logOut = () => {
		AuthService.logout();
		setCurrentUser(undefined);
	};

	return (
		<>
			{!isLoading && (
				<div>
					<Navbar currentUser={currentUser} logOut={logOut} />

					<main id='site-main' className='site-main'>
						<SearchBar onChangeText={debouncedChangeHandler} />
						<GenerateRoutes
							animesData={animesData}
							currentUser={currentUser}
							logOut={logOut}
						/>
					</main>
				</div>
			)}
		</>
	);
};

App.proptypes = {
	onChangeText: PropTypes.func,
};

export default App;
