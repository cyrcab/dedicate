import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import BlockIcon from '@mui/icons-material/Block';
import { Box, Typography } from '@mui/material';
import { backendUrl } from '../../../backendUrl';
import { axiosApiInstance } from '../../../axios.config';

export default function EventDetails() {
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();

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

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const eventDate = new Date(eventData.date);
  const currentDate = new Date();

  const isEventPassed = eventDate < currentDate;

  return (
    <Box>
        <Card
          sx={{
            m: 2,
            backgroundColor: isEventPassed ? 'gray' : 'rgba(202, 69, 186, 0.5)',
          }}
          className="createEvent"
        >
          <CardActions>
            {isEventPassed ? (
              <Button disabled>
                <BlockIcon /> Update Event
              </Button>
            ) : (
              <Link to={`/events/edit/${id}`}>Update Event</Link>
            )}
          </CardActions>
        </Card>
      <Typography variant="h1">Nom de event : {eventData.nom}</Typography>
      <Typography variant="h2">Date : {eventData.date}</Typography>
      <Typography variant="h2">Type de musique : {eventData.type}</Typography>
      <Typography variant="h2">
        Description : {eventData.description}
      </Typography>
      <Typography variant="h2">
        Prix Minimum par musique : {eventData.prix}
      </Typography>
      <Typography variant="h2">Nombre de slot : {eventData.nbSlots}</Typography>
      <Typography variant="h2">Lieu : {eventData.lieu}</Typography>
    </Box>
  );
}
