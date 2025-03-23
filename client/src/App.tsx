import './App.css';
import { Route, Routes } from 'react-router';
import LandingPage from './views/LandingPage';
import JoinPage from './views/JoinPage';
import VirtualRoom from './views/VirtualRoom';
import TestRoute from './views/TestRoute';
import AuthPage from './layouts/AuthPage';
import Login from './views/Login';
import SignUp from './views/SignUp';
import OtpForm from './views/OtpForm';

const AppRoutes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/join',
    element: <JoinPage />,
  },
  {
    path: '/r',
    element: <VirtualRoom />,
  },
  {
    path: '/login',
    element: <AuthPage children={<Login />} />,
  },
  {
    path: '/signup',
    element: <AuthPage children={<SignUp />} />,
  },
  {
    path: '/verify',
    element: <AuthPage children={<OtpForm />} />,
  },
  {
    path: '/test',
    element: <TestRoute />,
  },
];

function App() {
  return (
    <Routes>
      {AppRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  );
}

export default App;
