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
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import StyledInput from '../layout/StyledInput';
import TreeBranch from './TreeBranch';
import { getLocalities } from '../../actions/localities';
import { removeAzerbaijaniChars } from '../../utils';
import useWindowSize from '../../utils/hooks/useWindowSize';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';
import { Settlement } from '../../types';

interface DistrictSelectionState {
  city: Settlement;
  defaultDistricts: Settlement[];
  defaultSubdistricts: Settlement[];
  multiple: boolean;
  open: boolean;
  onClose: (district?: Settlement, subdistrict?: Settlement) => void;
}

const DistrictSelection: FC<DistrictSelectionState> = ({
  city,
  defaultDistricts,
  defaultSubdistricts,
  multiple,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const { enqueueSnackbar } = useSnackbar();

  const fullScreen = (width ?? 0) < 900;

  const [loading, setLoading] = useState<boolean>(true);
  const [districts, setDistricts] = useState<Settlement[]>([]);
  const [selectedDistricts, setSelectedDistricts] =
    useState<Settlement[]>(defaultDistricts);
  const [selectedSubdistricts, setSelectedSubdistricts] =
    useState<Settlement[]>(defaultSubdistricts);
  const [searchString, setSearchString] = useState<string>('');

  const fetchDistricts = useCallback(async () => {
    try {
      const result = await getLocalities({
        id:
          city.children
            ?.map((element) => {
              return element.id;
            })
            .join(',') ?? '',
      });
      setDistricts(result.data);
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
  }, [city.children, enqueueSnackbar, t]);

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  const handleClose = () => {
    onClose();
  };

  const handleSearchStringChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setSearchString(value);
  };

  const onSingleSelect = (district: Settlement, subdistrict?: Settlement) => {
    onClose(district, subdistrict);
  };

  const updateSelectedSettlements = (
    district: Settlement,
    parentValue: boolean | null,
    childrenValue: boolean[],
  ) => {};

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
        {t('settlement:selectDistrict')}
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
            placeholder: t('settlement:selectDistrictHint'),
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
          districts.map((district) => {
            return (
              <TreeBranch
                key={district.id}
                district={district}
                selectedDistricts={selectedDistricts}
                selectedSubdistricts={selectedSubdistricts}
                searchString={searchString}
                multiple={multiple}
                updateSelectedSettlements={updateSelectedSettlements}
                onSingleSelect={multiple ? undefined : onSingleSelect}
              />
            );
          })
        )}
      </DialogContent>
      {multiple && (
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DistrictSelection;
