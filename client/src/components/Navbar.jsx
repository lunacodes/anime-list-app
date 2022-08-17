import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ brand, links }) => {
  const NavLinks = () =>
    links.map(({ name, to }) => (
      <li className='nav-item' key={name}>
        <Link to={to}>{name}</Link>
      </li>
    ));

  return (
    <nav className='site-nav'>
      <a href={brand.to} className='site-brand'>
        {brand.name}
      </a>
      <ul className='nav-links'>
        <NavLinks />
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  brand: PropTypes.object,
  links: PropTypes.array,
};

export default Navbar;
