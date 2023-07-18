/* eslint-disable import/order */
/* eslint-disable indent */
import React, { useState } from 'react';
import './style/playlist.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import note from '../../../assets/note.png';
import playlist from '../../../assets/playlist.png';
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
      width: 600,
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
  const columns2 = [
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
      width: 600,
    },
  ];
  const rows2 = [
    {
      id: 1,
      EventName: 'RapRap',
      Status: 'En Cours',
      Style: 'Techno / House / Electro',
      Description: 'Lorem bk lijazljbdc lqjb ljzebf lezfh lzkjbc lk bzl czkjb clejkbzcl',
    },
    {
      id: 2,
      EventName: 'RapRap',
      Status: 'En Cours',
      Style: 'Techno / House / Electro',
      Description: 'Lorem bk lijazljbdc ',
    },
    {
      id: 3,
      EventName: 'RapRap',
      Status: 'En Cours',
      Style: 'Techno / House / Electro',
      Description: 'Lorem bk lijazljbdc lq',
    },
  ];
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url(${note})`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : 'rgba(202, 69, 186);',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${playlist})`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

export default function Playlist() {
    const [toggleValue, setToggleValue] = useState(false);

  const toggleHandler = () => {
    setToggleValue(!toggleValue);
  };

  const data = toggleValue ? { columns: columns2, rows: rows2 } : { columns, rows };
  return (
    <div>
        <div className='playlist'>
            <span>Playlist</span>
            <FormControlLabel
                checked={toggleValue}
                onChange={toggleHandler}
                control={
                <MaterialUISwitch
                defaultChecked />
                }
                label={
                <div className="switch-label">
                </div>
                }
                labelPlacement="start"
            />
            <span className='musiqueToggle'>Musique</span>
        </div>
        <div className='myEvents'>
        <Card sx={{ m: 2 }}>
            <div style={{ width: '100%' }}>
            <DataGrid
                rows={data.rows}
                columns={data.columns}
                headerClassName="custom-header"
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 30]}
                checkboxSelection
                />
            </div>
        </Card>
        </div>
    </div>

  );
}
