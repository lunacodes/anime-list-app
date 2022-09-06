import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ currentUser, logOut }) => {
	return (
		<>
			<nav className='navbar navbar-expand navbar-dark bg-dark site-nav'>
				<NavLink to={'/'} className='navbar-brand'>
					My Light Novels
				</NavLink>
				<div className='navbar-nav mr-auto'>
					<li className='nav-item'>
						<NavLink to={'/'} className='nav-link'>
							Home
						</NavLink>
					</li>
				</div>

				{currentUser ? (
					<div className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<NavLink to={'/profile'} className='nav-link'>
								{currentUser.username}
							</NavLink>
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
							<NavLink to={'/login'} className='nav-link'>
								Login
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink to={'/register'} className='nav-link'>
								Sign Up
							</NavLink>
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
