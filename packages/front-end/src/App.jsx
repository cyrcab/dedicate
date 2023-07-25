import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { ThemeProvider } from '@mui/material/styles';
import { useRoutes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignedIn } from './store/reducer/reducer';
import theme from './utils/appTheme';
import route from './components/router';

export default function App() {
  const routes = useRoutes(route);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(setSignedIn(false));
      return;
    }
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      dispatch(setSignedIn(false));
      return;
    }
    dispatch(setSignedIn(true));
    navigate('/');
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>{routes}</ThemeProvider>
    </>
  );
}
