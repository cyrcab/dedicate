import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
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
import RequireAuth from './components/router/RequireAuth';

export default function App() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

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
  }, [isSignedIn]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                 <Layout>
                  <Home />
                </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/playlist"
              element={
                <RequireAuth>
                  <Layout>
                    <Playlist />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/myEvents"
              element={
                <RequireAuth>
                  <Layout>
                    <MyEvents />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/myEvents/:id"
              element={
                <RequireAuth>
                  <Layout>
                    {/* <MyEventsDetails /> */}
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <Layout>
                    <Users />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/settings"
              element={
                <RequireAuth>
                  <Layout>
                    <Settings />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Layout>
                    <Profile />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
