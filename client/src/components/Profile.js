import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/authService';
// import Gallery from './Gallery';

// const Profile = ({ animes }) => {
const Profile = () => {
	const currentUser = AuthService.getCurrentUser();
	const filteredAnimes = currentUser.animes.filter((anime) => {
		return typeof anime === 'object' && anime.title;
	});
	// console.log(filteredAnimes);

	return (
		<>
			<h1 className='container user-profile--heading'>
				{/* eslint-disable react/no-unescaped-entities */}
				<strong>{currentUser.username}'s</strong> Profile
			</h1>
			<div className='container user-profile'>
				<div className='user-profile--left-side'>
					<img
						src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
						alt='profile-img'
						className='profile-img-card user-profile--image'
					/>
					{/* <strong>Role:</strong>
				<ul>
					{currentUser.roles &&
						currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
				</ul> */}
					<ul className='user-stats'>
						<li>
							<strong>Last Online:</strong>
						</li>
						<li>
							<strong>Joined:</strong>
						</li>
						<li>
							<a href='history'>History (unimplemented)</a>
						</li>
					</ul>
				</div>
				<div className='user-profile--right-side'>
					<p className='user-bio'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<h2 className='user-animes--heading'>
						{currentUser.username}'s Animes:
					</h2>
					{filteredAnimes &&
						filteredAnimes.map((anime) => (
							<>
								<div className='user-animes' key={anime.title}>
									<h3>{anime.title}</h3>
									<p>
										<strong>Date Added</strong>: {anime.dateAdded}
									</p>
									<p>
										<strong>Pages</strong>: {anime.pages}
									</p>
									<p>
										<strong>Progress</strong>: {anime.progress}
									</p>
								</div>
							</>
						))}
					{/* <Gallery animes={animes} /> */}
				</div>
			</div>
		</>
	);
};

Profile.propTypes = {
	animes: PropTypes.array,
};

export default Profile;
