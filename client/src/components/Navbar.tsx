import * as React from 'react';

const Navbar = (props: {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string }>;
}) => {
  // destructure to avoid props.brand.to
  const { brand, links } = props;

  const NavLinks: any = () =>
    links.map((link: { name: string; to: string }) => (
      <li className='nav-item' key={link.name}>
        <a className='nav-link' href={link.to}>
          {link.name}
        </a>
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
