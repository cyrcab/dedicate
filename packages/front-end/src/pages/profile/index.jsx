import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Box>
        <Link to={`/updateProfile/${userData.id}`}>
            <Card
            sx={{
              m: 2,
              backgroundColor: 'rgba(202, 69, 186, 0.5)',
            }}>
            Update Profile
            </Card>
        </Link>
      <Typography variant="h1">Nom : ${userData.nom}</Typography>
      <Typography variant="h2">Prénom : ${userData.prenom}</Typography>
      <Typography variant="h2">Mail : ${userData.mail}</Typography>
      <Typography variant="h2">
        Téléphone : ${userData.tel}
      </Typography>
      <Typography variant="h2">
        photo : ${userData.photo}
      </Typography>
      <Typography variant="h2">Role : ${userData.roleId}</Typography>
    </Box>
  );
}
