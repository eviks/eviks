import React, { FC, Fragment, useState, useEffect, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import StyledInput from '../../layout/StyledInput';
import MarkerIcon from '../../icons/MarkerIcon';
import { geocoder, getAddressByCoords } from '../../../actions/post';
import { Settlement, Address } from '../../../types';

const AddressInput: FC<{
  city: Settlement;
  address: string;
  helperText: string | false | undefined;
  setMapState: (name: string, value: any) => void;
  setMapStateLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ city, address, helperText, setMapState, setMapStateLoading }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Timer for typing delay
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setMapState('address', value);

    if (!value) {
      return;
    }

    const duration = 500;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setOptions([]);
        const addresses = await geocoder(value, city.x, city.y);
        setLoading(false);
        setOptions(addresses);
      } catch (error) {
        setLoading(false);
        setOptions([]);
      }
    }, duration);
  };

  const handleAutocompleteChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: Address | string,
  ) => {
    if (typeof newValue === 'string') return;

    setMapStateLoading(true);

    try {
      const response = await getAddressByCoords({
        lng: 'az',
        x: newValue.longitude,
        y: newValue.latitude,
      });

      setMapState('address', response.address);
      setMapState('city', response.city);
      setMapState('district', response.district || null);
      setMapState('subdistrict', response.subdistrict || null);
      setMapState('location', [newValue.longitude, newValue.latitude]);
    } catch (error) {
      // no user notification
    }

    setMapStateLoading(false);
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      disablePortal
      disableClearable
      forcePopupIcon={false}
      id="address"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(x) => {
        return x;
      }}
      getOptionLabel={(option) => {
        return `${option.address} ${option.name} ${option.latitude} ${option.longitude}`;
      }}
      options={options}
      fullWidth
      onChange={handleAutocompleteChange}
      PaperComponent={(props) => {
        return <Paper sx={{ mt: 1 }} {...props} />;
      }}
      renderInput={(params) => {
        const inputProps = { ...params.inputProps, value: address };
        return (
          <StyledInput
            label={t('post:address')}
            input={{
              id: 'address',
              name: 'address',
              value: address,
              type: 'text',
              onChange: handleChange,
              fullWidth: true,
              ref: params.InputProps.ref,
              inputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <MarkerIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                      sx={{ display: 'flex', mr: 2 }}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
            helperText={helperText}
          />
        );
      }}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Box>
              <Typography>{option.address}</Typography>
              <Typography variant="subtitle1" color={theme.palette.grey[500]}>
                {option.name}
              </Typography>
            </Box>
          </li>
        );
      }}
    />
  );
};

export default AddressInput;
