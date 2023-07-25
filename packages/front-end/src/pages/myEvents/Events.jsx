import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
<<<<<<<< HEAD:packages/front-end/src/pages/myEvents/component/Events.jsx
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Table from '../../../Table/Table';
import { backendUrl } from '../../../../backendUrl';
import { axiosApiInstance } from '../../../../axios.config';
========
import Table from '../../components/Table';
import { backendUrl } from '../../backendUrl';
import { axiosApiInstance } from '../../axios.config';
>>>>>>>> 70749be (fix(web-app): 🐛 router structure optimised + adding morgan in backend):packages/front-end/src/pages/myEvents/Events.jsx

export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'nom',
    headerName: 'Event',
    width: 130,
  },
  {
    field: 'lieu',
    headerName: 'Lieu',
    width: 90,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 180,
  },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    width: 250,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 90,
  },
  {
    field: 'prix',
    headerName: 'Prix',
    width: 90,
  },
  {
    field: 'nbSlots',
    headerName: 'Slots',
    width: 90,
  },
  {
    field: 'seeMore',
    headerName: 'See More',
    width: 90,
    renderCell: (params) => (
      <Link to={`/eventDetails/${params.row.id}`}>
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
    width: 100,
    renderCell: (params) => {
      const eventDate = new Date(params.row.date);
      const currentDate = new Date();
      const isEventPassed = eventDate < currentDate;
      return (
          <Link to={isEventPassed ? '#' : `/updateEvent/${params.row.id}`}>
              {isEventPassed ? 'Fini' : <EditIcon />}
          </Link>
      );
    },
  },
];

export default function Events() {
  // Initialisation de rows comme un état vide
  const [rows, setRows] = useState([]);

  const idCompany = useSelector((state) => state.auth.idEtablissement);

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

  return <Table rows={rows} columns={columns} />;
}
