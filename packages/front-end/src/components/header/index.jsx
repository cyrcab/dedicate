/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import ProfileComponent from './components/ProfileComponent';
import formatDateForReadIt from '../../utils/formatDateForReadItFr';

export default function Header() {
  const location = useLocation();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const getTitle = () => {
    const { pathname } = location;

    switch (pathname) {
      case '/':
        return 'Tableau de bord';
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
        backgroundColor: theme.palette.ba,
      }}
    >
      <Box>
        <Typography variant="h2">{getTitle()}</Typography>
        <Typography variant="subtitle2" color="GrayText">
          {formatDateForReadIt(new Date())}
        </Typography>
      </Box>
      <ProfileComponent user={user} />
    </Box>
  );
}
