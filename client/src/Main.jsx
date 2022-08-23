import React, { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';
import NovelPage from './components/NovelPage';
import getNovelsRequest from './services/getNovelsRequest.js';
import GenerateRoutes from './components/GenerateRoutes';

const Main = () => {
  const [novelsData, setNovelsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/users/refreshToken', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the auth token (really???)
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // Syn logouut across tabs
  const syncLogout = useCallback((event) => {
    if (event.key === 'logout') {
      // window.location.reload();
      history.push('/');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, [syncLogout]);

  useEffect(() => {
    async function fetchNovelData() {
      const data = await getNovelsRequest();
      const novel_data = await Object.values(data);
      await setNovelsData(novel_data);
      setIsLoading(false);
    }
    fetchNovelData();
  }, []);

  return userContext.token === null ? (
    <>
      {/* <div>Yes User Token</div> */}
      {!isLoading && novelsData.length > 0 && (
        <GenerateRoutes novelsData={novelsData} />
      )}
    </>
  ) : userContext.token ? (
    <>
      {/* <div>Yes User Token</div> */}
      {!isLoading && novelsData.length > 0 && (
        <GenerateRoutes novelsData={novelsData} />
      )}
    </>
  ) : (
    <>
      {/* <div>Yes User Token</div> */}
      {!isLoading && novelsData.length > 0 && (
        <GenerateRoutes novelsData={novelsData} />
      )}
    </>
  );
};

export default Main;
