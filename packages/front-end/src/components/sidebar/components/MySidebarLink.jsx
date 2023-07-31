import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MySidebarLink = ({ isActive, path, icon, pathName }) => {
  const navigate = useNavigate();
  return (
    <Button
      startIcon={icon}
      style={{
        padding: '0.875em',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
      sx={!isActive && { color: 'black' }}
      onClick={() => navigate({ pathname: path })}
      variant={isActive ? 'contained' : 'text'}
    >
      {pathName}
    </Button>
  );
};

export default MySidebarLink;
