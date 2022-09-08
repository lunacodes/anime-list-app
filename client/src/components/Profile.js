import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/authService';
// import Gallery from './Gallery';

// const Profile = ({ novels }) => {
const Profile = () => {
	const currentUser = AuthService.getCurrentUser();
	const filteredNovels = currentUser.novels.filter((novel) => {
		return typeof novel === 'object' && novel.title;
	});
	// console.log(filteredNovels);

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
					<h2 className='user-novels--heading'>
						{currentUser.username}'s Light Novels:
					</h2>
					{filteredNovels &&
						filteredNovels.map((novel) => (
							<>
								<div className='user-novels' key={novel.title}>
									<h3>{novel.title}</h3>
									<p>
										<strong>Date Added</strong>: {novel.dateAdded}
									</p>
									<p>
										<strong>Pages</strong>: {novel.pages}
									</p>
									<p>
										<strong>Progress</strong>: {novel.progress}
									</p>
								</div>
							</>
						))}
					{/* <Gallery novels={novels} /> */}
				</div>
			</div>
		</>
	);
};

Profile.propTypes = {
	novels: PropTypes.array,
};

export default Profile;
