/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import 'dayjs/locale/fr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDisplayNotification } from '../../../store/reducer/notification';
import { axiosApiInstance } from '../../../axios.config';
import { backendUrl } from '../../../backendUrl';
import MyCard from '../../../components/MyCard';

function UpdateEvent() {
  const [eventData, setEventData] = useState({
    nom: '',
    lieu: '',
    date: '',
    type: '',
    prix: '',
    description: '',
    nbSlots: '',
  });
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosApiInstance
      .get(`${backendUrl}events/one/${id}`)
      .then((response) => {
        setEventData(response.data.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [id]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const eventDataToUpdate = {
      nom: data.get('nom'),
      lieu: data.get('lieu'),
      date: new Date(eventData.date).toLocaleString('fr'),
      type: data.get('type'),
      prix: parseFloat(data.get('prix')),
      description: data.get('description'),
      nbSlots: parseInt(data.get('nbSlots'), 10),
    };

    axiosApiInstance
      .put(`${backendUrl}events/${id}`, { ...eventDataToUpdate })
      .then((response) => {
        dispatch(
          setDisplayNotification({
            message: 'Événement modifié avec succès',
            severity: 'SUCCESS',
          }),
        );
      })
      .catch((error) => {
        setDisplayNotification({
          message: `Erreur lors de la modification de l'événement: ${error.response.data.message}`,
          severity: 'ERROR',
        });
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
                value={eventData.nom}
                onChange={(e) => handleChange(e)}
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
                value={eventData.lieu}
                onChange={(e) => handleChange(e)}
                defaultValue={eventData.lieu}
              />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
              {eventData.date && (
                <DateTimePicker
                  label="Date de l'événement"
                  required
                  sx={{ width: '100%' }}
                  name="date"
                  minDateTime={dayjs()}
                  minTime={dayjs().hour(0).minute(0)}
                  onChange={(event) =>
                    setEventData({ ...eventData, date: event.$d })
                  }
                  defaultValue={dayjs(eventData.date)}
                />
              )}
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
              <TextField
                required
                fullWidth
                id="type"
                label="Type de musique"
                name="type"
                value={eventData.type}
                onChange={(e) => handleChange(e)}
                // autoComplete="type"
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
                onChange={(e) => handleChange(e)}
                value={eventData.description}
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
                onChange={(e) => handleChange(e)}
                value={eventData.prix}
                defaultValue={eventData?.prix}
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
                onChange={(e) => handleChange(e)}
                value={eventData.nbSlots}
                defaultValue={eventData.nbSlots}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: 'rgba(202, 69, 186, 0.5)' }}
            >
              Modifier un événement
            </Button>
          </form>
        </Box>
      </MyCard>
    </LocalizationProvider>
  );
}

export default UpdateEvent;
