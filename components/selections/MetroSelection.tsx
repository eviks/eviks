import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StyledInput from '../layout/StyledInput';
import useWindowSize from '../../utils/hooks/useWindowSize';
import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';
import { getMetroPresentation, removeAzerbaijaniChars } from '../../utils';
import { Settlement, MetroStation } from '../../types';

interface MetroSelectionState {
  city: Settlement;
  defaultMetroStations: MetroStation[];
  multiple: boolean;
  open: boolean;
  onClose: (metro?: MetroStation | MetroStation[]) => void;
}

const MetroSelection: FC<MetroSelectionState> = ({
  city,
  defaultMetroStations,
  multiple,
  open,
  onClose,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const fullScreen = (width ?? 0) < 900;

  const [filteredMetroStations, setFilteredMetroStations] = useState<
    MetroStation[]
  >(city.metroStations ?? []);
  const [selectedMetroStations, setSelectedMetroStations] =
    useState<MetroStation[]>(defaultMetroStations);
  const [searchString, setSearchString] = useState<string>('');

  useEffect(() => {
    setSelectedMetroStations(defaultMetroStations);
  }, [defaultMetroStations]);

  const handleClose = () => {
    onClose();
  };

  const handleSearchStringChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setSearchString(value);

    if (!city.metroStations) return;

    setFilteredMetroStations(
      city.metroStations.filter((metro) => {
        return removeAzerbaijaniChars(
          getMetroPresentation(metro, router.locale),
        )
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      }),
    );
  };

  const metroIsSelected = (id: number) => {
    return (
      selectedMetroStations.find((element) => {
        return element._id === id;
      }) !== undefined
    );
  };

  const handleItemClick = (metroStation: MetroStation) => {
    if (multiple) {
      if (metroIsSelected(metroStation._id)) {
        setSelectedMetroStations((prevState) => {
          return prevState.filter((element) => {
            return element._id !== metroStation._id;
          });
        });
      } else {
        setSelectedMetroStations((prevState) => {
          return [...prevState, metroStation];
        });
      }
    } else {
      onClose(metroStation);
    }
  };

  const onMultipleSelect = () => {
    onClose(selectedMetroStations);
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
        {t('settlement:selectMetro')}
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
        {
          <List>
            {filteredMetroStations.map((metroStation) => {
              return (
                <ListItemButton
                  key={metroStation._id}
                  onClick={() => {
                    return handleItemClick(metroStation);
                  }}
                >
                  {multiple && (
                    <Checkbox
                      checked={metroIsSelected(metroStation._id)}
                      disableRipple
                    />
                  )}
                  <ListItemText
                    primary={getMetroPresentation(metroStation, router.locale)}
                    sx={{ px: 2 }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        }
      </DialogContent>
      {multiple && (
        <DialogActions>
          <Button autoFocus onClick={onMultipleSelect}>
            {t('filters:saveDistrictFilter')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MetroSelection;
