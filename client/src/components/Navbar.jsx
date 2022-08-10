import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { brand, links } = props;

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

export default Navbar;
