/* eslint-disable indent */
import React from 'react';
import './style/myEvents.css';
import Card from '@mui/material/Card';
import Table from '../../Table/Table';
import { rows, columns } from './constant';

export default function MyEvents() {
  return (
    <div className="myEvents">
      <Card
        sx={{ m: 2, backgroundColor: 'rgba(202, 69, 186, 0.5)' }}
        className="createEvent"
      >
        Créer un évènement
      </Card>
      <Table rows={rows} columns={columns} />
    </div>
  );
}
