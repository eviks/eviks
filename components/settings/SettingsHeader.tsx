import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { User } from '../../types';

const SettingsHeader: FC<{ user: User }> = ({ user }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar
        alt={user.displayName}
        src={`${user.picture}`}
        sx={{
          height: '10rem',
          width: '10rem',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ml: 5,
        }}
      >
        <Typography variant="h2" fontSize={28} fontWeight={500} sx={{ mt: 3 }}>
          {user.displayName}
        </Typography>
        <Typography color={theme.palette.text.secondary}>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default SettingsHeader;
