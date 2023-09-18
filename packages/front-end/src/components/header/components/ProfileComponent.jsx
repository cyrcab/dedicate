import { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { setSignedOut } from '../../../store/reducer/reducer';
import getAvatar from '../utils/getAvatarName';
import {
  setDarkMode,
  setLightMode,
} from '../../../store/reducer/style.reducer';

const ProfileComponent = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.settingStyle);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton style={{ marginRight: '10px' }} onClick={handleMenu}>
        <Avatar alt="avatar">{getAvatar(user)}</Avatar>
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="body1"
          style={{ fontWeight: 'bold' }}
        >{`${user?.prenom} ${user?.nom}`}</Typography>
        <Typography variant="subtitle2" color={'GrayText'}>
          {user?.Role?.refRole}
        </Typography>
      </Box>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => (mode === 'dark' ? dispatch(setLightMode()) : dispatch(setDarkMode()))
          }
        >
          {mode === 'light' ? (
            <>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <ListItemText primary="Mode sombre" />
            </>
          ) : (
            <>
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>
              <ListItemText primary="Mode clair" />
            </>
          )}
        </MenuItem>
        <MenuItem onClick={() => dispatch(setSignedOut())}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileComponent;
