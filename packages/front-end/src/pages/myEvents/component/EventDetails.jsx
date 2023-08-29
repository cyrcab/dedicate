import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
  IconButton,
  ButtonGroup,
  Dialog,
} from '@mui/material';
import { backendUrl } from '../../../backendUrl';
import { axiosApiInstance } from '../../../axios.config';
import formatDateForReadIt from '../../../utils/formatDateForReadItFr';

export default function EventDetails() {
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const downloadFile = () => {
    const elm = document.createElement('a');
    elm.href = eventData.qrCode;
    elm.download = `Qr_${eventData.nom}.png`;
    elm.click();
  };

  const eventDate = new Date(eventData.date);
  const currentDate = new Date();

  const isEventPassed = eventDate < currentDate;

  return (
    <Container>
      <Card>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
          <CardActions>
            <ButtonGroup disabled={isEventPassed}>
              <Button onClick={handleClickOpen}>
                <QrCodeScannerIcon />
              </Button>
              <Button onClick={downloadFile}>
                <FileDownloadIcon />
              </Button>
              <Button onClick={() => navigate(`/events/edit/${eventData.id}`)}>
                <EditIcon />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Container>
        <Divider />
        {eventData.photo && (
          <CardMedia src={eventData.photo} component="img" alt="Event image" />
        )}
        <CardContent
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          <Typography variant="h1">{eventData.nom}</Typography>
          <Typography>Date : {formatDateForReadIt(eventData.date)}</Typography>
          <Typography>{eventData.type}</Typography>
          <Typography>{eventData.description}</Typography>
          <Typography>{eventData.prix}</Typography>
          <Typography>{eventData.nbSlots}</Typography>
          <Typography>{eventData.lieu}</Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <img src={eventData.qrCode} height={500} />
      </Dialog>
    </Container>
  );
}
