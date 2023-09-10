/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, TextField, Grid, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { axiosApiInstance } from '../../../axios.config';
import { backendUrl } from '../../../backendUrl';
import 'dayjs/locale/fr';
import MyCard from '../../../components/MyCard';
import { setDisplayNotification } from '../../../store/reducer/notification';

function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dateTime, setDateTime] = useState();
  const [genre, setGenre] = useState('');

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const genres = [
    'pop',
    'rock',
    'rap/hip-hop',
    'Electronique/EDM',
    'R&B',
    'country',
    'jazz',
    'classique',
    'reggae',
    'blues',
    'metal',
    'soul',
    'funk',
    'Punk',
    'Indie/Alternatif',
    'gospel',
    'Techno',
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const eventData = {
      nom: data.get('nom'),
      lieu: data.get('lieu'),
      date: dateTime.toLocaleString('fr'),
      type: data.get('type'),
      prix: parseFloat(data.get('prix')),
      description: data.get('description'),
      nbSlots: parseInt(data.get('nbSlots'), 10),
      images: data.get('photo'),
    };

    axiosApiInstance
      .post(`${backendUrl}events`, eventData)
      .then(() => {
        dispatch(
          setDisplayNotification({
            message: 'Événement créé avec succès',
            severity: 'SUCCESS',
          }),
        );
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
                label="Date de l'événement"
                required
                sx={{ width: '100%' }}
                name="date"
                minDateTime={dayjs()}
                minTime={dayjs().hour(0).minute(0)}
                onChange={(event) => setDateTime(event.$d)}
              />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={genre}
                    name="type"
                    label="Genre"
                    onChange={handleChange}
                  >
                    {genres.map((genreOption) => (
                      <MenuItem key={genreOption} value={genreOption}>
                        {genreOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
