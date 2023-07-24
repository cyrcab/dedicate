import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../Table/Table';
import { backendUrl } from '../../../backendUrl';
import { axiosApiInstance } from '../../../axios.config';

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
    width: 400,
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
];

export default function Events() {
  // Initialisation de rows comme un état vide
  const [rows, setRows] = useState([]);

  const idCompany = useSelector((state) => state.auth.idCompany);

  console.log(idCompany);

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
