import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, TextField, Typography } from '@mui/material';
import MyCard from '../../../components/MyCard';
import { axiosApiInstance } from '../../../axios.config';
import { backendUrl } from '../../../backendUrl';
import { setDisplayNotification } from '../../../store/reducer/notification';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(user);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userDataToPut = {
      nom: data.get('nom'),
      prenom: data.get('prenom'),
      mail: data.get('mail'),
      tel: data.get('tel'),
    };

    axiosApiInstance
      .put(`${backendUrl}users/${user.id}`, {
        ...userDataToPut,
      })
      .then(() => {
        dispatch(
          setDisplayNotification({
            message: 'Utilisateur modifié avec succès',
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

  return (
    <MyCard goBack>
      <Typography variant="h4" align="center" pb={2}>
        Infos personnelles
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container p={2}>
          <Grid item xs={12} pb={2}>
            <TextField
              required
              fullWidth
              id="nom"
              label="Nom"
              name="nom"
              value={userData.nom}
              onChange={(e) => handleChange(e)}
              autoComplete="nom"
              defaultValue={userData.nom}
            />
          </Grid>
          <Grid item xs={12} pb={2}>
            <TextField
              required
              fullWidth
              id="prenom"
              label="Prénom"
              name="prenom"
              value={userData.prenom}
              onChange={(e) => handleChange(e)}
              autoComplete="prenom"
              defaultValue={userData.prenom}
            />
          </Grid>
          <Grid item xs={12} pb={2}>
            <TextField
              required
              fullWidth
              id="mail"
              label="Mail"
              name="mail"
              value={userData.mail}
              onChange={(e) => handleChange(e)}
              autoComplete="mail"
              defaultValue={userData.mail}
            />
          </Grid>
          <Grid item xs={12} pb={2}>
            <TextField
              required
              fullWidth
              id="tel"
              label="Téléphone"
              name="tel"
              type="tel"
              value={userData.tel}
              onChange={(e) => handleChange(e)}
              autoComplete="tel"
              defaultValue={userData.tel}
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained">
            Modifier l'utilisateur
          </Button>
        </Grid>
      </form>
      <Typography variant="h4" align="center" pb={2}>
        Infos professionnelles
      </Typography>
      <Grid container p={2}>
        <Grid item xs={12} pb={2}>
          <TextField
            disabled
            fullWidth
            id="nom-etablissement"
            label="Nom établissement"
            name="nom-etablissement"
            value={userData.Etablissement.nom}
            defaultValue={userData.Etablissement.nom}
          />
        </Grid>
        <Grid item xs={12} pb={2}>
          <TextField
            disabled
            fullWidth
            id="etablissement-adresse"
            label="Adresse"
            name="adresse"
            value={userData.Etablissement.adresse}
            defaultValue={userData.Etablissement.adresse}
          />
        </Grid>
        <Grid item xs={12} pb={2}>
          <TextField
            disabled
            fullWidth
            id="etablissement-ville"
            label="Ville"
            name="ville"
            value={userData.Etablissement.ville}
            defaultValue={userData.Etablissement.ville}
          />
        </Grid>
        <Grid item xs={12} pb={2}>
          <TextField
            disabled
            fullWidth
            id="etablissement-codePostal"
            label="Code postal"
            name="codePostal"
            value={userData.Etablissement.codePostal}
            defaultValue={userData.Etablissement.codePostal}
          />
        </Grid>
      </Grid>
    </MyCard>
  );
}
