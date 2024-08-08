import Router from './Router';
import NavBar from './components/NavBar';
import LoginModal from './components/LoginModal';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from './recoil/login/loginModalAtoms';

const App = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <>
      {isModalOpen && <LoginModal />}
      <NavBar />
      <Router />
    </>
  );
};

export default App;
