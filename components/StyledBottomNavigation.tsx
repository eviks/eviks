import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Hidden from '@mui/material/Hidden';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HeartIcon from './icons/HeartIcon';
import SettingsIcon from './icons/SettingsIcon';
import PlusIcon from './icons/PlusIcon';
import SearchIcon from './icons/SearchIcon';

const StyledBottomNavigation = () => {
  const { t } = useTranslation();

  const router = useRouter();

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
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: '500' }}
        elevation={0}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            label={t('common:bottomNavigationSearch')}
            icon={<SearchIcon viewBox="0 0 512 512" />}
          />
          <BottomNavigationAction
            label={t('common:bottomNavigationFavorites')}
            icon={<HeartIcon viewBox="0 0 512 512" />}
          />
          <BottomNavigationAction
            label={t('common:bottomNavigationScreenCreate')}
            icon={<PlusIcon viewBox="0 0 426.667 426.667" />}
          />
          <BottomNavigationAction
            label={t('common:bottomNavigationScreenProfile')}
            icon={<SettingsIcon viewBox="0 0 512.001 512.001" />}
          />
        </BottomNavigation>
      </Paper>
    </Hidden>
  );
};

export default StyledBottomNavigation;
