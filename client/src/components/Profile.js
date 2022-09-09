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
					<h2 className='user-animes-heading'>
						{currentUser.username}'s Animes:
					</h2>
					<table className='user-animes-table'>
						<thead>
							<tr>
								<th>Image</th>
								<th>Title</th>
								<th>Rating</th>
								<th>Progress</th>
								<th>Date Added</th>
							</tr>
						</thead>

						<tbody>
							{filteredAnimes &&
								filteredAnimes.map((anime) => (
									<>
										<tr className='user-animes-row' key={anime.title}>
											<td key={anime.title}>
												<img src={anime.thumb} alt={anime.title} />
											</td>
											<td>
												<h3 key={anime.title}>{anime.title}</h3>
											</td>
											<td>{anime.rating || ' '}</td>
											<td>
												{anime.eps_watched || 0} / {anime.episodes}
											</td>
											<td>{anime.date_added}</td>
										</tr>
									</>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

Profile.propTypes = {
	animes: PropTypes.array,
};

export default Profile;
