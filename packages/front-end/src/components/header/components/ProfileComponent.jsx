import { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSignedOut } from '../../../store/reducer/reducer';
import getAvatar from '../utils/getAvatarName';

const ProfileComponent = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

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
        <MenuItem onClick={() => dispatch(setSignedOut())}>
          Déconnexion
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileComponent;
