/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import './style/myEvents.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '../../components/Table';
import { backendUrl } from '../../backendUrl';
import { axiosApiInstance } from '../../axios.config';
import formatDateForReadIt from '../../utils/formatDateForReadItFr';

export default function MyEvents() {
  const [rows, setRows] = useState([]);

  const idCompany = useSelector((state) => state.auth.user.idEtablissement);

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
        <Link to={`/events/${params.row.id}`}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Link>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        const eventDate = new Date(params.row.date);
        const currentDate = new Date();
        const isEventPassed = eventDate < currentDate;
        return (
          <Link to={isEventPassed ? '#' : `/events/edit/${params.row.id}`}>
            {isEventPassed ? 'Fini' : <EditIcon />}
          </Link>
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
