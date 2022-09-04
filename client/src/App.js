import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import AuthService from './services/authService';
import getNovelsRequest from './services/novelService';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import GenerateRoutes from './components/GenerateRoutes';
import EventBus from './common/EventBus';

const App = () => {
	const [currentUser, setCurrentUser] = useState(undefined);
	const [novelsQueryStr, setNovelsQueryStr] = useState('');
	const [novelsData, setNovelsData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	// Search Bar Functions & Effects
	const changeHandler = (event) => {
		setNovelsQueryStr(event.target.value);
	};

	const debouncedChangeHandler = useMemo(
		() => debounce(changeHandler, 300),
		[novelsQueryStr]
	);
	// Stop the invocation of the debounced function
	// after unmounting
	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel();
		};
	}, []);

	// Novel Data Effect
	useEffect(() => {
		async function fetchNovelData() {
			const data = await getNovelsRequest(novelsQueryStr);
			const novel_data = await Object.values(data);
			await setNovelsData(novel_data);
			setIsLoading(false);
		}
		fetchNovelData();
	}, [novelsQueryStr]);

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
							novelsData={novelsData}
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
