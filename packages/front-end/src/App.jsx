import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSignedIn } from './store/reducer/reducer';
import Home from './components/pages/home';
import Playlist from './components/pages/playlist/index';
import MyEvents from './components/pages/myEvents/index';
import Profile from './components/pages/profile/index';
import Layout from './components/layout/index';
import Users from './components/pages/users/index';
import Settings from './components/pages/settings/index';
import theme from './utils/appTheme';
// import MyEventsDetails from './components/pages/myEvents/component/MyEventsDetails';
import Login from './components/pages/login/index';
import Register from './components/pages/register/index';

export default function App() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.isSignedIn);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
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
    } catch (error) {
      dispatch(setSignedIn(false));
    }
  };

  useEffect(() => {
    checkToken();
  }, [isSignedIn]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={ isSignedIn
                ? <Layout>
                  <Home />
                </Layout>
                : <Navigate to='/login' replace />
              }
            />
            <Route
              path="/playlist"
              element={ isSignedIn
                ? <Layout>
                  <Playlist />
                </Layout>
                : <Navigate to='/login' replace />
              }
            />
            <Route
              path="/myEvents"
              element={ isSignedIn
                ? <Layout>
                  <MyEvents />
                </Layout>
                : <Navigate to='/login' replace />
              }
            />
            <Route
              path="/myEvents/:id"
              element={ isSignedIn
                ? <Layout>
                  <Home />
                </Layout>
                : <Navigate to='/login' replace />
              }
            />
            <Route
              path="/users"
              element={ isSignedIn
                ? <Layout>
                  <Users />
                </Layout>
                : <Navigate to='/login' replace />
              }
            />
            <Route
              path="/settings"
              element={ isSignedIn
                ? <Layout>
                  <Settings />
                </Layout>
                : <Navigate to='/login' replace />
              }
            />
            <Route
              path="/profile"
              element={ isSignedIn
                ? <Layout>
                  <Profile />
                </Layout>
                : <Navigate to='/login' replace />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
