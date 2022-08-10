import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Logout from './components/Logout';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  );
};
export default Main;
