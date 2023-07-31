/* eslint-disable indent */
import React from 'react';
import './style/users.css';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';

const columns = [
  {
    field: 'id', headerName: 'ID', width: 70,
  },
  {
    field: 'EventName', headerName: 'Event', width: 130,
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
  return (
    <div className='myEvents'>
      <Card sx={{ m: 2, backgroundColor: 'rgba(202, 69, 186, 0.5)' }} className='createEvent'>
        Ajouter un utilisateur
      </Card>
      <Card sx={{ m: 2 }}>
        <div style={{ width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            headerClassName="custom-header"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 30]}
          />
        </div>
      </Card>
    </div>
  );
}
