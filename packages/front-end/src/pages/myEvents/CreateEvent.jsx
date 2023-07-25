/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Card, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { axiosApiInstance } from '../../../../axios.config';
import { backendUrl } from '../../../../backendUrl';

function UpdateEvent() {
  const [dateTime, setDateTime] = useState();
  const [eventData, setEventData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axiosApiInstance.get(`${backendUrl}events/one/${id}`)
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [id]);

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
    // eslint-disable-next-line no-shadow
    const eventData = {
      nom: data.get('nom'),
      lieu: data.get('lieu'),
      date: formatDateTime(data.get('date')),
      type: data.get('type'),
      prix: parseFloat(data.get('prix')),
      description: data.get('description'),
      nbSlots: parseInt(data.get('nbSlots'), 10),
    };

    axiosApiInstance.put(`${backendUrl}events/`, id)
      .then((response) => {
        console.log(response.data);
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
                defaultValue={eventData.nom}
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
                defaultValue={eventData.lieu}
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
                defaultValue={eventData.date}
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
                defaultValue={eventData.type}
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
                defaultValue={eventData.description}
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
                defaultValue={eventData.prix}
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
                defaultValue={eventData.nbSlots}
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

export default UpdateEvent;
