import React, { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import StyledInput from '../../layout/StyledInput';
import MetroIcon from '../../icons/MetroIcon';
import { MetroStation, Settlement } from '../../../types';
import { getMetroPresentation } from '../../../utils';

const MetroInput: FC<{
  city: Settlement;
  metroStation?: MetroStation | null;
  helperText: string | false | undefined;
  setMapState: (name: string, value: any) => void;
}> = ({ city, metroStation, helperText, setMapState }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleAutocompleteChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: MetroStation | null,
  ) => {
    setMapState('metroStation', newValue || null);
  };

  if (!city.metroStations || city.metroStations.length === 0) {
    return null;
  }

  return (
    <Autocomplete
      disablePortal
      id="metroStation"
      getOptionLabel={(option) => {
        return getMetroPresentation(option, router.locale);
      }}
      value={metroStation}
      options={city.metroStations!.sort((a, b) => {
        return getMetroPresentation(a, router.locale).localeCompare(
          getMetroPresentation(b, router.locale),
        );
      })}
      isOptionEqualToValue={(option, value) => {
        if (!value) return false;
        return option._id === value._id;
      }}
      fullWidth
      onChange={handleAutocompleteChange}
      renderInput={(params) => {
        const inputProps = { ...params.inputProps };
        return (
          <StyledInput
            label={t('post:metroStation')}
            input={{
              id: 'metroStation',
              name: 'metroStation',
              value: metroStation,
              type: 'text',
              fullWidth: true,
              ref: params.InputProps.ref,
              inputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <MetroIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
            helperText={helperText}
          />
        );
      }}
    />
  );
};

export default MetroInput;
