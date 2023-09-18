/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import './style/myEvents.css';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '../../components/Table';
import { backendUrl } from '../../backendUrl';
import { axiosApiInstance } from '../../axios.config';
import formatDateForReadIt from '../../utils/formatDateForReadItFr';

export default function MyEvents() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const idCompany = useSelector((state) => state.user.idEtablissement);

  useEffect(() => {
    axiosApiInstance
      .get(`${backendUrl}events/${idCompany}`)
      .then((response) => {
        const formattedData = response.data.data.map((item) => ({
          id: item.id,
          nom: item.nom,
          type: item.type,
          description: item.description,
          lieu: item.lieu,
          nbSlots: item.nbSlots,
          date: item.date,
          prix: item.prix,
          isActive: item.isActive,
        }));
        setRows(formattedData);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  const columns = [
    {
      field: 'nom',
      headerName: 'Event',
    },
    {
      field: 'lieu',
      headerName: 'Lieu',
    },
    {
      field: 'type',
      headerName: 'Type',
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
    },
    {
      field: 'date',
      headerName: 'Date',
      valueFormatter: (item) => formatDateForReadIt(item.value),
    },
    {
      field: 'prix',
      headerName: 'Prix',
    },
    {
      field: 'nbSlots',
      headerName: 'Slots',
    },
    {
      field: 'seeMore',
      headerName: 'See More',
      renderCell: (params) => (
        <IconButton onClick={() => navigate(`/events/${params.row.id}`)}>
          <InfoIcon />
        </IconButton>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        if (params.row.isActive) {
          return (
            <IconButton
              onClick={() => navigate(`/events/edit/${params.row.id}`)}
            >
              <EditIcon />
            </IconButton>
          );
        }
        return (
          <Typography variant="body1" align="center">
            Fini
          </Typography>
        );
      },
    },
  ];
  return (
    <Table
      rows={rows}
      columns={columns}
      headerButton={{
        title: 'Ajouter un événement',
        link: '/events/create',
      }}
    />
  );
}
