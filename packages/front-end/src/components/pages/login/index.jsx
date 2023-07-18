/* eslint-disable implicit-arrow-linebreak */
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import club from '../../../assets/club.jpg';
import logo from '../../../assets/logo.png';
import { backendUrl } from '../../../backendUrl';
import { setSignedIn } from '../../../store/reducer/reducer';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');

  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const onDismissAlert = () => setVisible(false);

  const handleLogin = () => {
    const data = {
      email,
      password: mdp,
    };

    axios
      .post(backendUrl + 'auth/loginEta', data)
      .then((response) => {
        dispatch({ type: 'SET_USER_DATA', payload: response.data });
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('userId', response.data.data.id.toString());
        dispatch(setSignedIn(true));
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setVisible(true);
        // eslint-disable-next-line no-console
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
            backgroundImage: `url(${club})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              (t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900]),
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
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={setEmail}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={setMdp}
                type={showPassword ? 'password' : 'text'}
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                onSubmit={handleLogin}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {'Do not have an account? Register'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Snackbar
          open={visible}
          autoHideDuration={6000}
          onClose={onDismissAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={onDismissAlert} severity="error">
            {messageError}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}
