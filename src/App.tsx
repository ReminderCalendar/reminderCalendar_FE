import React from 'react';
import Router from './Router';
import NavBar from './components/Navbar/NavBar';
import LoginModal from './components/LoginModal/LoginModal';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from './recoil/login/loginModalAtoms';

const App = () => {
  const [isModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <>
      {isModalOpen && <LoginModal />}
      <NavBar />
      <Router />
    </>
  );
};

export default App;
