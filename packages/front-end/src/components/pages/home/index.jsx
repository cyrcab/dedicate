/* eslint-disable indent */
import React from 'react';
import './style/home.css';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Table from '../../Table/Table';

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//   }));

export default function Home() {
  return (
    <div className='home'>
      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid xs={2}>
          <Button
            className='dashboardCreateEvent'
            sx={{
              backgroundColor: 'rgba(202, 69, 186, 0.5)',
              borderRadius: '25px',
              color: 'black',
              width: '12vw',
              '&:hover': { backgroundColor: 'rgba(202, 69, 186, 0.8)' },
            }}
          >
            Créer un évènement
          </Button>
        </Grid>
        <Grid xs={10}>
          <div className='tableContainer'>
            <Table />
          </div>
        </Grid>
        <Grid xs={2}>
          <Button
            className='dashboardCreateEvent'
            sx={{
              backgroundColor: 'rgba(202, 69, 186, 0.5)',
              borderRadius: '25px',
              color: 'black',
              width: '12vw',
              '&:hover': { backgroundColor: 'rgba(202, 69, 186, 0.8)' },
            }}
          >
            Gestion Musique
          </Button>
        </Grid>
        <Grid xs={10}>
          <div className='tableContainer'>
            <Table />
          </div>
        </Grid>
      </Grid>
      {/* <div className='ligne1'>home
            <div className='col1'>test
                <div className='topSquare'>test</div>
                <div className='bottomSquare'>test</div>
            </div>

            <div className='col2'>

            </div>
        </div>

        <div className='ligne2'>
            <div className='col1'></div>
            <div className='col2'></div>
            <div className='col3'>
                <div className='subline1'>
                    <div className='leftSquare'></div>
                    <div className='rightSquare'></div>
                </div>
                <div className='subline2'>
                    <div className='leftSquare'></div>
                    <div className='rightSquare'></div>
                </div>
            </div>
        </div> */}
    </div>
  );
}
