import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from './assets/logo.png';
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
        backgroundColor: '#ffffff',
        borderRight: '1px solid #E6E6E6',
      }}
    >
      <Box
        sx={{
          height: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          image={logo}
          sx={{
            height: '40px',
            width: '40px',
          }}
        />
        <Typography variant="h4">DEDICATE</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '50%',
          marginTop: '2rem',
          padding: '0 20px',
        }}
      >
        <MySidebarLink
          isActive={isActive('/')}
          path={'/'}
          icon={<LeaderboardIcon />}
          pathName={'Accueil'}
        />
        <MySidebarLink
          isActive={isActive('/events')}
          path={'/events'}
          icon={<EventIcon />}
          pathName={'Événements'}
        />
        <MySidebarLink
          isActive={isActive('/playlist')}
          path={'/playlist'}
          icon={<QueueMusicIcon />}
          pathName={'Playlist'}
        />
        <MySidebarLink
          isActive={isActive('/users')}
          path={'/users'}
          icon={<AccountCircleIcon />}
          pathName={'Utilisateurs'}
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
