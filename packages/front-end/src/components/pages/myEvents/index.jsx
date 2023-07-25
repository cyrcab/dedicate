/* eslint-disable indent */
import React from 'react';
import './style/myEvents.css';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Events from './component/Events';

export default function MyEvents() {
  return (
    <div className="myEvents">
      <Link to={'/createEvent'}>
        <Card
          sx={{ m: 2, backgroundColor: 'rgba(202, 69, 186, 0.5)' }}
          className="createEvent"
        >
          Créer un évènement
        </Card>
      </Link>
      <Events />
    </div>
  );
}
