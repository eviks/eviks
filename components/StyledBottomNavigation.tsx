import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Hidden from '@mui/material/Hidden';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useTheme, alpha } from '@mui/material/styles';
import HeartIcon from './icons/HeartIcon';
import SettingsIcon from './icons/SettingsIcon';
import PlusIcon from './icons/PlusIcon';
import SearchIcon from './icons/SearchIcon';

const StyledBottomNavigation: FC = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const theme = useTheme();

  const [value, setValue] = useState<number>(0);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setValue(newValue);
    if (newValue === 0) router.push({ pathname: '/' });
    if (newValue === 1) router.push({ pathname: '/favorites' });
    if (newValue === 2) router.push({ pathname: '/create_post' });
    if (newValue === 3) router.push({ pathname: '/profile' });
  };

  return (
    <Hidden mdUp>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: '500',
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(theme.palette.background.default, 0.7),
        }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          sx={{ backgroundColor: 'transparent' }}
        >
          <BottomNavigationAction
            label={t('common:bottomNavigationSearch')}
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            label={t('common:favorites')}
            icon={<HeartIcon />}
          />
          <BottomNavigationAction
            label={t('common:bottomNavigationScreenCreate')}
            icon={<PlusIcon />}
          />
          <BottomNavigationAction
            label={t('common:bottomNavigationScreenProfile')}
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Hidden>
  );
};

export default StyledBottomNavigation;
