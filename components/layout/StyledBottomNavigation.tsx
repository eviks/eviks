import React, { FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Hidden from '@mui/material/Hidden';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useTheme, alpha } from '@mui/material/styles';
import ModalAuth from '../auth/ModalAuth';
import { AppContext } from '../../store/appContext';
import HeartIcon from '../icons/HeartIcon';
import SettingsIcon from '../icons/SettingsIcon';
import PlusIcon from '../icons/PlusIcon';
import SearchIcon from '../icons/SearchIcon';

const StyledBottomNavigation: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();

  const {
    state: {
      auth: { user, isInit },
    },
  } = useContext(AppContext);

  const defaultValue = () => {
    switch (router.pathname) {
      case '/favorites':
        return 1;
      case '/profile':
        return 3;
      default:
        return 0;
    }
  };

  const [value, setValue] = useState<number>(defaultValue());
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    if (!user && isInit) {
      if (newValue === 1 || newValue === 2) {
        setOpen(true);
      } else {
        setValue(newValue);
        if (newValue === 0) router.push({ pathname: '/' });
        if (newValue === 3) router.push({ pathname: '/profile' });
      }
    } else {
      setValue(newValue);
      if (newValue === 0) router.push({ pathname: '/' });
      if (newValue === 1) router.push({ pathname: '/favorites' });
      if (newValue === 2) router.push({ pathname: '/edit_post' });
      if (newValue === 3) router.push({ pathname: '/profile' });
    }
  };

  return (
    <Hidden mdUp>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: '1000',
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
        <ModalAuth open={open} onClose={onClose} />
      </Paper>
    </Hidden>
  );
};

export default StyledBottomNavigation;
