import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { ThemeProvider } from '@mui/material/styles';
import { useRoutes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignedIn, setSignedOut } from './store/reducer/reducer';
import theme from './utils/appTheme';
import route from './components/router';
import { axiosApiInstance } from './axios.config';
import { backendUrl } from './backendUrl';
import SnackBarDisplayer from './components/SnackBarDisplayer';

export default function App() {
  const routes = useRoutes(route);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    if (!token) {
      dispatch(setSignedOut());
      return;
    }
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      dispatch(setSignedOut());
      return;
    }
    axiosApiInstance
      .get(`${backendUrl}users/${id}`)
      .then((res) => {
        dispatch(setSignedIn(res.data.data));
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>{routes}</ThemeProvider>
      <SnackBarDisplayer />
    </>
  );
}
