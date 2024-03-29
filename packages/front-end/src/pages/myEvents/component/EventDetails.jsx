import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import {
  CardContent,
  Container,
  Divider,
  Typography,
  ButtonGroup,
  Dialog,
  Box,
  Grid,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import PaidIcon from '@mui/icons-material/Paid';
import { backendUrl } from '../../../backendUrl';
import { axiosApiInstance } from '../../../axios.config';
import formatDateForReadIt from '../../../utils/formatDateForReadItFr';
import MyCard from '../../../components/MyCard';
import { setDisplayNotification } from '../../../store/reducer/notification';

export default function EventDetails() {
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeactivate = () => {
    axiosApiInstance
      .get(`${backendUrl}diffuser/${id}`)
      .then(() => {
        dispatch(
          setDisplayNotification({
            message: "L'événement a été désactivé",
            severity: 'SUCCESS',
          }),
        );
      })
      .catch((error) => {
        dispatch(
          setDisplayNotification({
            message: `Erreur lors de la modification de l'événement: ${error.response.data.message}`,
            severity: 'ERROR',
          }),
        );
      });
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

  return (
    <MyCard
      goBack
      rightAction={
        <ButtonGroup disabled={!eventData.isActive}>
          <Button onClick={handleClickOpen}>
            <QrCodeScannerIcon />
          </Button>
          <Button onClick={downloadFile}>
            <FileDownloadIcon />
          </Button>
          <Button onClick={() => navigate(`/events/edit/${eventData.id}`)}>
            <EditIcon />
          </Button>
          <Button onClick={handleDeactivate}>
            <BlockIcon />
          </Button>
        </ButtonGroup>
      }
    >
      <Divider />
      <CardContent>
        <Container>
          <Typography variant="h2">{eventData.nom}</Typography>
          <Divider />
          <Grid container sx={{ display: 'flex' }} mt={3}>
            <Grid item sm={6}>
              <Typography>
                Date : {formatDateForReadIt(eventData.date)}
              </Typography>
              <Typography>Type de musique : {eventData.type}</Typography>
              <Typography>Description : {eventData.description}</Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>Prix minimum : {eventData.prix}</Typography>
              <Typography>Nombre de musique : {eventData.nbSlots}</Typography>
              <Typography>Lieu de l'événement : {eventData.lieu}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 10,
            }}
          >
            <Grid item sm={5}>
              <Box mt={3}>
                <Typography variant="h2">Playlist</Typography>
                <Divider />
              </Box>
              {eventData.diffuser.length > 0 && (
                <List>
                  {eventData.diffuser.map((diffuser) => (
                    <>
                      <ListItem key={diffuser.idEnchere}>
                        <ListItemAvatar>
                          <Avatar src={diffuser.musique.album} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={diffuser.musique.titre}
                          secondary={diffuser.musique.artiste}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              )}
            </Grid>
            <Grid
              item
              sm={1}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Divider orientation="vertical" />
            </Grid>
            <Grid item sm={5}>
              <Box mt={3}>
                <Typography variant="h2">Enchères</Typography>
                <Divider />
              </Box>
              {eventData.diffuser.length > 0 && (
                <List>
                  {eventData.enchere
                    .sort((a, b) => b.prix - a.prix)
                    .map((enchere) => (
                      <>
                        <ListItem key={enchere.idEnchere}>
                          <ListItemIcon>
                            <PaidIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={enchere.prix}
                            secondary={enchere.User.prenom}
                          />
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                </List>
              )}
            </Grid>
          </Grid>
        </Container>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <img src={eventData.qrCode} height={500} />
      </Dialog>
    </MyCard>
  );
}
