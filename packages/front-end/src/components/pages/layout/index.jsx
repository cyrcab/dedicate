/* eslint-disable react/prop-types */
import React from 'react';
import { Grid } from '@mui/material';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import './style/layout.css';

export default function Layout({ children }) {
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
        <Grid item xs={12} height={'90%'}>
          <main>{children}</main>
        </Grid>
      </Grid>
    </Grid>
  );
}
