import { Box, Card, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MyCard = (props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minHeight: '100%' }}>
      <Box
        sx={
          props.rightAction && {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }
        }
        my={1}
      >
        {props.goBack && (
          <>
            <IconButton
              color="primary"
              onClick={() => navigate(-1)}
              sx={{ marginLeft: 1 }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box mr={1}>{props.rightAction && props.rightAction}</Box>
          </>
        )}
      </Box>
      {props.children}
    </Card>
  );
};

export default MyCard;
