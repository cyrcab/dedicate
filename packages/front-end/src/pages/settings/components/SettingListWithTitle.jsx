import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

const SettingListWithTitle = ({ parameters }) => {
  const theme = useTheme();

  return (
    <Grid container>
      {parameters.map((parameter, i) => (
        <Grid item sm={12} md={6} lg={4} key={i}>
          <Typography variant="h4" color={theme.palette.primary.main}>
            {parameter.title}
          </Typography>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(2),
            }}
          >
            {parameter.settingList.map((setting, index) => (
              <Box key={index}>
                <Link
                  to={`/settings/${setting.path}`}
                  style={{ color: `${theme.palette.primary.light}` }}
                >
                  {setting.title}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SettingListWithTitle;
