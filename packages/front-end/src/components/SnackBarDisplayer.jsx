import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayNotification } from '../store/reducer/notification';

const SnackBarDisplayer = () => {
  const { isDisplay, message, severity } = useSelector(
    (state) => state.notification,
  );
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    dispatch(setDisplayNotification({ isDisplay: false }));
  };

  if (!isDisplay) return <></>;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isDisplay}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default SnackBarDisplayer;
