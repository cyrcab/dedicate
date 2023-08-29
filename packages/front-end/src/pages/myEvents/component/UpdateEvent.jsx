/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  Card,
  Box,
  Container,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { axiosApiInstance } from '../../../axios.config';
import { backendUrl } from '../../../backendUrl';
import MyCard from '../../../components/MyCard';

function UpdateEvent() {
  const [dateTime, setDateTime] = useState();
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
  const navigate = useNavigate();

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

    // eslint-disable-next-line no-shadow
    const formatDateTime = (dateTime) => {
      const [datePart, timePart] = dateTime.split('T');
      const [year, month, day] = datePart.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      return `${formattedDate} ${timePart}:00`;
    };

    const eventDataToUpdate = {
      nom: data.get('nom'),
      lieu: data.get('lieu'),
      date: formatDateTime(data.get('date')),
      type: data.get('type'),
      prix: parseFloat(data.get('prix')),
      description: data.get('description'),
      nbSlots: parseInt(data.get('nbSlots'), 10),
    };

    axiosApiInstance
      .put(`${backendUrl}events/${id}`, { ...eventDataToUpdate })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
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
              value={eventData.date.slice(0, 16)}
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
            Créer un événement
          </Button>
        </form>
      </Box>
    </MyCard>
  );
}

export default UpdateEvent;
