import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import { useLocation } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../../assets/logov1.png';
import MySidebarLink from './components/MySidebarLink';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        height: '100vh',
      }}
    >
      <Box
        sx={{
          height: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 30px',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          image={logo}
          sx={{
            height: '45px',
            width: '45px',
            backgroundSize: 'contain',
          }}
        />
        <Typography variant="h5">DEDICATE</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '50%',
          marginTop: '2rem',
          padding: '0 20px',
        }}
      >
        <MySidebarLink
          isActive={isActive('/events') || isActive('/')}
          path={'/events'}
          icon={<EventIcon />}
          pathName={'Événements'}
        />
        <MySidebarLink
          isActive={isActive('/settings')}
          path={'/settings'}
          icon={<SettingsIcon />}
          pathName={'Paramètres'}
        />
      </Box>
    </Box>
  );
}
