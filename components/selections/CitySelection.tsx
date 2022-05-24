import React, { FC, useState, useEffect, useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import StyledInput from '../layout/StyledInput';
import { getLocalities } from '../../actions/localities';
import { removeAzerbaijaniChars, getSettlementPresentation } from '../../utils';
import useWindowSize from '../../utils/hooks/useWindowSize';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';
import { Settlement } from '../../types';

interface CitySelectionState {
  open: boolean;
  onClose: (value?: Settlement) => void;
}

const CitySelection: FC<CitySelectionState> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const { enqueueSnackbar } = useSnackbar();

  const fullScreen = (width ?? 0) < 900;

  const [loading, setLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<Settlement[]>([]);
  const [filteredCities, setFilteredCities] = useState<Settlement[]>([]);
  const [searchString, setSearchString] = useState<string>('');

  const fetchCities = useCallback(async () => {
    try {
      const result = await getLocalities({ type: '2' });
      setCities(result.data);
      setFilteredCities(result.data);
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Failure) {
        errorMessage = error.message;
      } else if (error instanceof ServerError) {
        errorMessage = t('common:serverError');
      } else {
        errorMessage = t('common:unknownError');
      }
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
    setLoading(false);
  }, [enqueueSnackbar, t]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleClose = () => {
    onClose();
  };

  const handleSearchStringChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setSearchString(value);

    setFilteredCities(
      cities.filter((city) => {
        return removeAzerbaijaniChars(getSettlementPresentation(city))
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      }),
    );
  };

  const handleItemClick = (city: Settlement) => {
    onClose(city);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          width: { md: '800px' },
          maxWidth: { md: '800px' },
          height: { md: '600px' },
        },
      }}
    >
      <DialogTitle>
        {t('settlement:selectCity')}
        {
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
      <Box
        sx={{
          mx: 2,
        }}
      >
        <StyledInput
          value={searchString}
          name="searchString"
          input={{
            id: 'searchString',
            type: 'text',
            placeholder: t('settlement:selectCityHint'),
            fullWidth: true,
            onChange: handleSearchStringChange,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <DialogContent dividers sx={{ p: 0 }}>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <List>
            {filteredCities.map((city) => {
              return (
                <ListItemButton
                  key={city.id}
                  onClick={() => {
                    return handleItemClick(city);
                  }}
                >
                  <ListItemText
                    primary={getSettlementPresentation(city)}
                    sx={{ px: 2 }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CitySelection;
