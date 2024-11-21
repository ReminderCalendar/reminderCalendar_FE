import React from 'react';
import ActiveBox from './ActiveBox';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isActive = localStorage.getItem('active');

  React.useEffect(() => {
    if (isActive === 'true') navigate('/calendar');
  });

  return (
    <>{isActive === null || isActive === 'false' ? <ActiveBox /> : null}</>
  );
};

export default Home;
