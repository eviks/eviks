import React, { FC, useState, useContext, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import Register from './Register';
import TabPanel from '../layout/TabPanel';
import CloseIcon from '../icons/CloseIcon';
import { AppContext } from '../../store/appContext';
import useWindowSize from '../../utils/hooks/useWindowSize';

interface ModalAuthState {
  open: boolean;
  onClose: () => void;
}

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
  };
}

const ModalAuth: FC<ModalAuthState> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const { width } = useWindowSize();
  const fullScreen = (width ?? 0) < 900;

  const {
    state: {
      auth: { user, isInit },
    },
  } = useContext(AppContext);

  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user && isInit) {
      onClose();
    }
  }, [isInit, onClose, user]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          width: { md: '500px' },
          maxWidth: { md: '500px' },
          height: { md: 'auto' },
        },
      }}
    >
      <DialogTitle>
        {
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              p: 2,
              color: (theme) => {
                return theme.palette.mode === 'light'
                  ? theme.palette.grey[500]
                  : theme.palette.grey[300];
              },
            }}
          >
            <CloseIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        }
      </DialogTitle>
      <DialogContent sx={{ px: 0 }}>
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            maxWidth: {
              md: 'auto',
              lg: '40vw',
            },
            m: 'auto',
            px: 2,
          }}
        >
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label={t('auth:signInTitle')} {...a11yProps(0)} />
            <Tab label={t('auth:signUpTitle')} {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Login redirect={false} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAuth;
