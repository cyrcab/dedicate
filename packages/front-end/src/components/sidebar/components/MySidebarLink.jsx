import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const MySidebarLink = ({ isActive, path, icon, pathName }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Button
      startIcon={icon}
      style={{
        padding: '0.875em',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
      onClick={() => navigate({ pathname: path })}
      sx={{
        color: isActive
          ? theme.palette.text.primary
          : theme.palette.text.secondary,
      }}
      variant={isActive ? 'contained' : 'text'}
    >
      {pathName}
    </Button>
  );
};

export default MySidebarLink;
