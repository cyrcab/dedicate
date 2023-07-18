import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import './sidebar.css';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from './assets/logo.png';

export default function Sidebar() {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #E6E6E6',
      }}
    >
      <Box
        sx={{
          height: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          image={logo}
          sx={{
            height: '40px',
            width: '40px',
          }}
        />
        <Typography variant="h4">DEDICATE</Typography>
      </Box>

      <Box>
        <Box>
          <Box>
            <LeaderboardIcon />
            <a href="/">Dashboard</a>
          </Box>
          <Box>
            <EventIcon />
            <a href="/myEvents">My Events</a>
          </Box>
          <Box>
            <QueueMusicIcon />
            <a href="/playlist">Playlist</a>
          </Box>
          <Box>
            <AccountCircleIcon />
            <a href="/users">Users</a>
          </Box>
          <Box>
            <SettingsIcon />
            <a href="/settings">Settings</a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
