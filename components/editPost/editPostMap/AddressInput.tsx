import React, { FC, Fragment, useState, useEffect, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import StyledInput from '../../StyledInput';
import { geocoder } from '../../../actions/post';
import { MapState, Settlement, Address } from '../../../types';

const AddressInput: FC<{
  city: Settlement;
  address: string;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
}> = ({ city, address, setMapState }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Timer for typing delay
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setMapState((prevState) => {
      return { ...prevState, address: value };
    });

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

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      freeSolo
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
      onChange={(
        _event: React.SyntheticEvent<Element, Event>,
        newValue: Address | string,
      ) => {
        setMapState((prevState) => {
          return {
            ...prevState,
            address:
              typeof newValue === 'string' ? newValue : newValue?.address ?? '',
          };
        });
      }}
      PaperComponent={(props) => {
        return <Paper sx={{ mt: 1 }} {...props} />;
      }}
      sx={{
        position: { xs: 'absolute', md: 'initial' },
        zIndex: 1000,
        mt: { xs: 10, md: 0 },
        px: { xs: 3, md: 0 },
      }}
      renderInput={(params) => {
        const inputProps = { ...params.inputProps, value: address };
        return (
          <StyledInput
            validators={['required']}
            value={address}
            name={'address'}
            errorMessages={[t('post:errorAddress')]}
            label={t('post:address')}
            input={{
              onChange: handleChange,
              type: 'text',
              fullWidth: true,
              ref: params.InputProps.ref,
              inputProps,
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
          />
        );
      }}
      renderOption={(props, option) => {
        return <li {...props}>{option.address}</li>;
      }}
    />
  );
};

export default AddressInput;
