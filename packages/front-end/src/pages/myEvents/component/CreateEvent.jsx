/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, TextField, Grid, Card, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { axiosApiInstance } from '../../../../axios.config';
import { backendUrl } from '../../../../backendUrl';

function CreateEvent() {
  const [dateTime, setDateTime] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-shadow
    const formatDateTime = (dateTime) => {
      const [datePart, timePart] = dateTime.split('T');
      const [year, month, day] = datePart.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      return `${formattedDate} ${timePart}:00`;
    };
    const eventData = {
      nom: data.get('nom'),
      lieu: data.get('lieu'),
      date: formatDateTime(data.get('date')),
      type: data.get('type'),
      prix: parseFloat(data.get('prix')),
      description: data.get('description'),
      nbSlots: parseInt(data.get('nbSlots'), 10),
      photo: data.get('photo'),
    };

    axiosApiInstance
      .post(`${backendUrl}events`, eventData)
      .then((response) => {
        console.log(response.data);
        navigate('/myEvents');
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <Card sx={{ m: 2 }}>
      <Box container spacing={2} m={2}>
        <form onSubmit={handleSubmit} noValidate>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              required
              fullWidth
              id="nom"
              label="Nom de l'événement"
              name="nom"
              autoComplete="nom"
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              required
              fullWidth
              id="lieu"
              label="Lieu"
              name="lieu"
              autoComplete="lieu"
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              required
              fullWidth
              id="date"
              name="date"
              autoComplete="date"
              type="datetime-local"
              onChange={(event) => setDateTime(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              required
              fullWidth
              id="type"
              label="Type de musique"
              name="type"
              autoComplete="type"
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              required
              fullWidth
              id="prix"
              label="Prix"
              name="prix"
              autoComplete="prix"
              type="number"
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              required
              fullWidth
              id="nbSlots"
              label="Nombre de places"
              name="nbSlots"
              autoComplete="nbSlots"
              type="number"
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              id="photo"
              label="Photo"
              name="photo"
              autoComplete="photo"
              type="file"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: 'rgba(202, 69, 186, 0.5)' }}
          >
            Créer un événement
          </Button>
        </form>
      </Box>
    </Card>
  );
}

export default CreateEvent;