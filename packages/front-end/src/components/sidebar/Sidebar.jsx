import React from 'react';
import './Sidebar.css';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../assets/logo.png';

export default function Sidebar() {
  return (
    <div className='dashboard'>
      <div className='logo'>
        <img src={logo} className='dashboard_logo' />
        <div className='logoName'>DEDICATE</div>
      </div>

      <div className='dashboard_content'>
        <div className='dashboard_list'>
          <div className='dashboard_unit'>
            <LeaderboardIcon />
            <a href='/'>Dashboard</a>
          </div>
          <div className='dashboard_unit'>
            <EventIcon />
            <a href='/myEvents'>My Events</a>
          </div>
          <div className='dashboard_unit'>
            <QueueMusicIcon />
            <a href='/playlist'>Playlist</a>
          </div>
          <div className='dashboard_unit'>
            <AccountCircleIcon />
            <a href='/users'>Users</a>
          </div>
          <div className='dashboard_unit'>
            <SettingsIcon />
            <a href='/settings'>Settings</a>
          </div>

        </div>
      </div>
    </div>
  );
}
