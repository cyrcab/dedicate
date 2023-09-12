import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setStyle } from '../store/reducer/style.reducer';
import themeGeneration from './appTheme';

const AppThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { main, secondary, mode } = useSelector((state) => state.settingStyle);
  const mainStorage = localStorage.getItem('main');
  const secondaryStorage = localStorage.getItem('secondary');
  const modeStorage = localStorage.getItem('mode');

  useEffect(() => {
    if (mainStorage !== 'undefined') {
      dispatch(
        setStyle({
          main: mainStorage,
        }),
      );
    }

    if (secondaryStorage !== 'undefined') {
      dispatch(
        setStyle({
          secondary: secondaryStorage,
        }),
      );
    }

    if (modeStorage) {
      dispatch(
        setStyle({
          mode: modeStorage,
        }),
      );
    }
  }, []);

  const theme = themeGeneration({
    secondaryColor: secondary,
    mainColor: main,
    mode,
  });

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
