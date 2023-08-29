/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { axiosApiInstance } from '../../../axios.config';
import { backendUrl } from '../../../backendUrl';
import 'dayjs/locale/fr';
import MyCard from '../../../components/MyCard';

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
      images: data.get('photo'),
    };

    axiosApiInstance
      .post(`${backendUrl}events`, eventData)
      .then((response) => {
        navigate('/events');
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <MyCard goBack>
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
              <DateTimePicker
                label="Basic date time picker"
                required
                sx={{ width: '100%' }}
              />
              {/* <TextField
                required
                fullWidth
                id="date"
                name="date"
                min="2021-10-01T00:00"
                autoComplete="date"
                type="datetime-local"
                onChange={(event) => setDateTime(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
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
      </MyCard>
    </LocalizationProvider>
  );
}

export default CreateEvent;
