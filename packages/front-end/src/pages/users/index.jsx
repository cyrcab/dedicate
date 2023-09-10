/* eslint-disable indent */
import React from 'react';
import './style/users.css';
import Table from '../../components/Table';

const columns = [
  {
    field: 'EventName',
    headerName: 'Event',
  },
  {
    field: 'Status',
    headerName: 'Status',
  },
  {
    field: 'Style',
    headerName: 'Style',
  },
  {
    field: 'Description',
    headerName: 'Description',
    sortable: false,
  },
];
const rows = [
  {
    id: 1,
    EventName: 'TechnoMix',
    Status: 'En Cours',
    Style: 'Techno / House / Electro',
    Description: 'aze;jazhba;jhavcb',
  },
  {
    id: 2,
    EventName: 'TechnoMix',
    Status: 'En Cours',
    Style: 'Techno / House / Electro',
    Description: 'Lorem bk lijazljbdc ',
  },
  {
    id: 3,
    EventName: 'TechnoMix',
    Status: 'En Cours',
    Style: 'Techno / House / Electro',
    Description: 'Lorem bk lijazljbdc ',
  },
];

export default function Users() {
  return <Table rows={rows} columns={columns} />;
}
