/* eslint-disable react/prop-types */
import React from 'react';
import './header.css';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ProfileComponent from './components/ProfileComponent';

const user = {
  lastName: 'Sébastien',
  firstName: 'Bouillon',
  role: 'Admin',
};

export default function Header() {
  const location = useLocation();
  const getTitle = () => {
    const { pathname } = location;

    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/playlist':
        return 'Playlist';
      case '/myEvents':
        return 'My Events';
      case '/users':
        return 'Users';
      case '/settings':
        return 'Settings';
      case '/profile':
        return 'Profile';
      default:
        return '';
    }
  };

  return (
    <Box
      height={'100%'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: 'white',
        borderBottom: '1px solid #E6E6E6',
      }}
    >
      <Box>
        <Typography variant="h5">{getTitle()}</Typography>
        <Typography variant="subtitle2" color={'GrayText'}>
          04 Juillet 2023
        </Typography>
      </Box>
      <ProfileComponent user={user} />
    </Box>
  );
}
