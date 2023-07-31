import React from 'react';
import './style/settings.css';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSignedOut } from '../../store/reducer/reducer';

export default function Settings() {
  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => dispatch(setSignedOut())}
    >
      Déconnexion
    </Button>
  );
}
