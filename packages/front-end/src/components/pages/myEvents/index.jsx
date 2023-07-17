/* eslint-disable indent */
import React from 'react';
import './style/myEvents.css';
import Card from '@mui/material/Card';
import Table from '../../Table/Table';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'EventName',
    headerName: 'Event',
    width: 130,
  },
  {
    field: 'Status',
    headerName: 'Status',
    width: 90,
  },
  {
    field: 'Style',
    headerName: 'Style',
    width: 180,
  },
  {
    field: 'Description',
    headerName: 'Description',
    sortable: false,
    width: 400,
  },
  {
    field: 'Heure',
    headerName: 'Heure début',
    width: 90,
  },
  {
    field: 'Lieu',
    headerName: 'Lieu',
    width: 90,
  },
];

const rows = [
  {
    id: 1,
    EventName: 'TechnoMix',
    Status: 'En Cours',
    Style: 'Techno / House / Electro',
    Description: 'aze;jazhba;jhavcb',
    Heure: '20h',
    Lieu: 'Paris',
  },
  {
    id: 2,
    EventName: 'TechnoMix',
    Status: 'En Cours',
    Style: 'Techno / House / Electro',
    Description: 'Lorem bk lijazljbdc ',
    Heure: '20h',
    Lieu: 'Paris',
  },
  {
    id: 3,
    EventName: 'TechnoMix',
    Status: 'En Cours',
    Style: 'Techno / House / Electro',
    Description: 'Lorem bk lijazljbdc ',
    Heure: '20h',
    Lieu: 'Paris',
  },
];

export default function MyEvents() {
  return (
    <div className='myEvents'>
      <Card
        sx={{ m: 2, backgroundColor: 'rgba(202, 69, 186, 0.5)' }}
        className='createEvent'
      >
        Créer un évènement
      </Card>
      <Table rows={rows} columns={columns} />
    </div>
  );
}
