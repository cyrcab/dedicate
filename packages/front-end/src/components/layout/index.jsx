/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../header';
import Sidebar from '../sidebar';

export default function Layout() {
  const activeTab = 'New events';

  return (
    <Grid container>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid container item xs={10} maxHeight={'100vh'}>
        <Grid item xs={12} height={'10%'}>
          <Header activeTab={activeTab} />
        </Grid>
        <Grid item xs={12} height={'90%'} style={{ padding: '0 20px' }}>
          <Box>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
