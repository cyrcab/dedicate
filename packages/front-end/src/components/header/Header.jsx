/* eslint-disable react/prop-types */
import React from 'react';
import './Header.css';
import Avatar from '@mui/material/Avatar';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const getTitle = () => {
    const { pathname } = location;

    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/playlist':
        return 'Playlist';
      case '/myEvents':
        return 'My Events';
      case '/users':
        return 'Users';
      case '/settings':
        return 'Settings';
      case '/profile':
        return 'Profile';
      default:
        return '';
    }
  };

  return (
    <div className="navigation">
      <div className="header_text">
        <div className="header_title">{getTitle()}</div>
        <div className="header_subtitle">04 Juillet 2023</div>
      </div>
      <div className="profile">
        <Avatar href="/profile" alt="Sonic" src="../assets/sonic.png" />
      </div>
    </div>
  );
}
