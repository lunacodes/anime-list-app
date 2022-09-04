import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

	useEffect(() => {
		async function fetchNovelData() {
			const data = await getNovelsRequest(novelsQueryStr);
			const novel_data = await Object.values(data);
			await setNovelsData(novel_data);
			setIsLoading(false);
		}
		fetchNovelData();
	}, [novelsQueryStr]);

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
			{!isLoading && novelsData.length > 0 && (
				<div>
					<Navbar currentUser={currentUser} logOut={logOut} />

					<main id='site-main' className='site-main'>
						<SearchBar
							value={novelsQueryStr}
							onChangeText={(e) => {
								setNovelsQueryStr(e.target.value);
							}}
						/>
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
	value: PropTypes.string,
	onChangeText: PropTypes.func,
};

export default App;
