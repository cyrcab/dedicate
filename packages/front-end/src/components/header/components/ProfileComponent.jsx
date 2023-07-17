import { Link } from 'react-router-dom';
import { Box, Avatar, Typography } from '@mui/material';
import getAvatar from '../utils/getAvatarName';

const ProfileComponent = ({ user }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Link to="/profile" style={{ marginRight: '10px' }}>
      <Avatar alt="avatar">{getAvatar(user)}</Avatar>
    </Link>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="body1"
        style={{ fontWeight: 'bold' }}
      >{`${user.firstName} ${user.lastName}`}</Typography>
      <Typography variant="subtitle2" color={'GrayText'}>
        {user.role}
      </Typography>
    </Box>
  </Box>
);

export default ProfileComponent;
