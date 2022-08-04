import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props: {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string }>;
}) => {
  // destructure to avoid props.brand.to
  const { brand, links } = props;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const NavLinks: any = () =>
    links.map((link: { name: string; to: string }) => (
      <li className='nav-item' key={link.name}>
        <Link to={link.to}>{link.name}</Link>
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
