import React from 'react';
import ActiveBox from './components/ActiveBox';
import Schedule from '../Schedule/Schedule';

const Home = () => {
  const isActive = localStorage.getItem('active');

  return (
    <>
      {isActive === 'true' && <Schedule />}
      {isActive === null || isActive === 'false' ? <ActiveBox /> : null}
    </>
  );
};

export default Home;
