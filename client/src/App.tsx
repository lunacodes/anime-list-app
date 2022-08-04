import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Main from './Main';

const navigation = {
  brand: { name: 'My Light Novels', to: '/' },
  links: [
    { name: 'Home', to: '/' },
    { name: 'Profile', to: '/profile' },
    { name: 'Logout', to: '/logout' },
  ],
};

const App: React.FC = () => {
  const { brand, links } = navigation;
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars

  return (
    <div className='App'>
      <header className='App-header'>
        <Navbar brand={brand} links={links} />
      </header>
      <main id='site-main' className='site-main'>
        <Main />
      </main>
    </div>
  );
};

export default App;
