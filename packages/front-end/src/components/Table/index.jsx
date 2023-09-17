/* eslint-disable indent */
import React, { useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useContainerDimension from '../../utils/hooks/useContainerDimension';

export default function Table({ rows, columns, headerButton }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { width } = useContainerDimension(ref);
  let updatedCol = columns;

  if (columns.length > 0 && width > 800) {
    updatedCol = columns.map((col) => ({
      ...col,
      width: width / columns.length,
    }));
  }

  return (
    <Card style={{ height: '100%' }} ref={ref}>
      <Box
        sx={{
          height: '10%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
        }}
      >
        <Button
          onClick={() => navigate(headerButton?.link)}
          variant="contained"
          size="small"
          endIcon={<AddIcon />}
        >
          {headerButton?.title ? headerButton.title : 'Ajouter'}
        </Button>
      </Box>
      <Box sx={{ height: '90%' }}>
        <DataGrid
          rows={rows}
          columns={updatedCol}
          sortModel={[
            {
              field: 'date',
              sort: 'desc',
            },
          ]}
          rowSelection={false}
          hideFooterSelectedRowCount
          headerClassName="custom-header"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
        />
      </Box>
    </Card>
  );
}
