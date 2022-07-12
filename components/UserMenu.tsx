import React, { Fragment, FC, useState, useContext } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import SettingsIcon from './icons/SettingsIcon';
import LogoutIcon from './icons/LogoutIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import { logout } from '../actions/auth';
import { AppContext } from '../store/appContext';
import { User } from '../types';

const UserMenu: FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();

  const { dispatch } = useContext(AppContext);

  const settings = [
    {
      name: t('common:myPosts'),
      route: '/user_posts',
      icon: <BookmarkIcon />,
    },
    {
      name: t('common:profile'),
      route: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout()(dispatch);
  };

  return (
    <Fragment>
      <Tooltip title={t('common:openUserMenu')}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.displayName} src={`${user.picture}`} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Typography textAlign={'center'}>{user.displayName}</Typography>
        </MenuItem>
        <Divider />
        {settings.map((setting, index) => {
          return (
            <Box key={index}>
              <Link href={setting.route} passHref>
                <a>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <ListItemText>{setting.name}</ListItemText>
                  </MenuItem>
                </a>
              </Link>
            </Box>
          );
        })}
        <Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>{t('common:logout')}</ListItemText>
          </MenuItem>
        </Box>
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
