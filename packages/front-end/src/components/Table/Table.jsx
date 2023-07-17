/* eslint-disable indent */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';

const columns = [
  ];

  const rows = [
  ];

export default function Table() {
  return <Card>
  <div className='tableDimension'>
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
</Card>;
}
