/* eslint-disable prefer-template */
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import club2 from '../../../assets/club2.jpg';
import logo from '../../../assets/logo.png';
import { backendUrl } from '../../../backendUrl';
import { setSignedIn } from '../../../store/reducer/reducer';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://dedicate.warmachines.tech">
        Dedicate
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [tel, setTel] = useState('');
  const [nomEta, setNomEta] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [adresse, setAdresse] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const onDismissAlert = () => setVisible(false);

  const dispatch = useDispatch();

  const handleLogin = () => {
    const data = {
      email,
      password: mdp,
      nom,
      prenom,
      tel,
      ville,
      codePostal,
      nomEta,
      adresse,
    };

    axios
      .post(backendUrl + 'auth/registerEta', data)
      .then((response) => {
        dispatch({ type: 'SET_USER_DATA', payload: response.data });
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('userId', JSON.stringify(response.data.data.id));
        dispatch(setSignedIn(true));
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setVisible(true);
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${club2})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <img src={logo} alt="logo" style={{ height: '50px' }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom"
                label="Nom"
                onChangeText={setNom}
                name="nom"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom"
                label="Prénom"
                onChangeText={setPrenom}
                name="prenom"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="tel"
                label="Téléphone"
                onChangeText={setTel}
                name="tel"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="nomEta"
                label="Nom de l'établissement"
                onChangeText={setNomEta}
                name="nomEta"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="adresse"
                label="Adresse"
                onChangeText={setAdresse}
                name="adresse"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="ville"
                label="Ville"
                onChangeText={setVille}
                name="ville"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="codePostal"
                label="Code Postal"
                onChangeText={setCodePostal}
                name="codePostal"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse Email"
                name="email"
                onChangeText={setEmail}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={setMdp}
                label="Mot de passe"
                type={ showPassword ? 'password' : 'text'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirmation mot de passe"
                type={ showPassword2 ? 'password' : 'text'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {'Already have an account? Login'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Snackbar
          sx={{ width: '100%', top: 0 }}
          spacing={2}
          visible={visible}
          onDismiss={onDismissAlert}
        >
          <Alert severity="error">{messageError}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}
