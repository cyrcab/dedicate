import React from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MyCard from '../../../components/MyCard';
import { setStyle } from '../../../store/reducer/style.reducer';

const StyleSettings = () => {
  const dispatch = useDispatch();
  const { main, secondary } = useSelector((state) => state.settingStyle);
  const [newStyle, setNewStyle] = React.useState({
    main,
    secondary,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setStyle(newStyle));
  };

  return (
    <MyCard goBack>
      <Typography variant="h3" align="center" pb={2}>
        Changez votre style
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          p={2}
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          <Grid item xs={6} pb={2}>
            <TextField
              required
              fullWidth
              type="color"
              id="mainColor"
              label="Couleur principale"
              name="mainColor"
              value={newStyle.main}
              onChange={(e) => {
                setNewStyle({ ...newStyle, main: e.target.value });
                localStorage.setItem('main', e.target.value);
              }}
              autoComplete="nom"
              defaultValue={newStyle.main}
            />
          </Grid>
          <Grid item xs={6} pb={2}>
            <TextField
              required
              fullWidth
              type="color"
              id="secondaryColor"
              label="Couleur secondaire"
              name="secondaryColor"
              value={newStyle.secondary}
              onChange={(e) => {
                setNewStyle({ ...newStyle, secondary: e.target.value });
                localStorage.setItem('secondary', e.target.value);
              }}
              autoComplete="nom"
              defaultValue={newStyle.secondary}
            />
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Sauvegarder
          </Button>
        </Grid>
      </form>
    </MyCard>
  );
};

export default StyleSettings;
