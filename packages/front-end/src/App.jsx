import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { setSignedIn } from './store/reducer/reducer';
import router from './components/router';
import theme from './utils/appTheme';

export default function App() {
  const dispatch = useDispatch();

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
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
