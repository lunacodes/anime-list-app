import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import AuthService from './services/auth.service';
import getNovelsRequest from './services/novels.service';
import Navbar from './components/Navbar';
import GenerateRoutes from './components/GenerateRoutes';
import EventBus from './common/EventBus';

const App = () => {
	const [currentUser, setCurrentUser] = useState(undefined);
	const [novelsData, setNovelsData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchNovelData() {
			const data = await getNovelsRequest();
			const novel_data = await Object.values(data);
			await setNovelsData(novel_data);
			setIsLoading(false);
		}
		fetchNovelData();
	}, []);

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

export default App;
