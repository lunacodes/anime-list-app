import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ currentUser, logOut }) => {
	return (
		<>
			<nav className='navbar navbar-expand navbar-dark bg-dark site-nav'>
				<Link to={'/'} className='navbar-brand'>
					My Light Novels
				</Link>
				<div className='navbar-nav mr-auto'>
					<li className='nav-item'>
						<Link to={'/'} className='nav-link'>
							Home
						</Link>
					</li>

				{currentUser ? (
					<div className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<Link to={'/profile'} className='nav-link'>
								{currentUser.username}
							</Link>
						</li>
						<li className='nav-item'>
							<a href='/login' className='nav-link' onClick={logOut}>
								LogOut
							</a>
						</li>
					</div>
				) : (
					<div className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<Link to={'/login'} className='nav-link'>
								Login
							</Link>
						</li>

						<li className='nav-item'>
							<Link to={'/register'} className='nav-link'>
								Sign Up
							</Link>
						</li>
					</div>
				)}
			</nav>
		</>
	);
};

Navbar.propTypes = {
	currentUser: PropTypes.object,
	logOut: PropTypes.any,
};
export default Navbar;
