/* eslint-disable react/prop-types */
import React from 'react';
import './header.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import ProfileComponent from './components/ProfileComponent';

export default function Header() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const getTitle = () => {
    const { pathname } = location;

    switch (pathname) {
      case '/':
        return 'Tableau de bord';
      case '/playlist':
        return 'Playlist';
      case '/events':
        return 'Événements';
      case '/events/create':
        return "Création d'un événement";
      case '/users':
        return 'Utilisateurs';
      case '/settings':
        return 'Paramètres';
      case '/profile':
        return 'Profil';
      case '/settings/style':
        return 'Paramètres Style';
      case '/settings/profile':
        return 'Paramètres Profil';
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
        <Typography variant="h2">{getTitle()}</Typography>
        <Typography variant="subtitle2" color={'GrayText'}>
          {new Date().toLocaleDateString()}
        </Typography>
      </Box>
      <ProfileComponent user={user} />
    </Box>
  );
}
