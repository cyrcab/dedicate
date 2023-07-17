import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home';
import Playlist from './components/pages/playlist/index';
import MyEvents from './components/pages/myEvents/index';
import Profile from './components/pages/profile/index';
import Layout from './components/layout/index';
import Users from './components/pages/users/index';
import Settings from './components/pages/settings/index';
import MyEventsDetails from './components/pages/myEvents/component/MyEventsDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954',
    },
    secondary: {
      main: '#191414',
    },
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/myEvents" element={<MyEvents />} />
              <Route path="/myEvents/:id" element={<MyEventsDetails />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
