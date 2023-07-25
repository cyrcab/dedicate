import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  if (user.isSignedIn) {
    navigate('/');
  }
  return <Outlet />;
};

export default AuthLayout;
