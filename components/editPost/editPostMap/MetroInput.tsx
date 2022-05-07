import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Autocomplete from '@mui/material/Autocomplete';
import StyledInput from '../../StyledInput';
import { MetroStation, MapState, Settlement } from '../../../types';
import { getMetroPresentation } from '../../../utils';

const MetroInput: FC<{
  city: Settlement;
  metroStation?: MetroStation | null;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
}> = ({ metroStation, setMapState, city }) => {
  const { t } = useTranslation();

  const handleAutocompleteChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: MetroStation | null,
  ) => {
    setMapState((prevState) => {
      return {
        ...prevState,
        metroStation: newValue,
      };
    });
  };

  if (!city.metroStations || city.metroStations.length === 0) {
    return null;
  }

  return (
    <Autocomplete
      disablePortal
      id="metroStation"
      getOptionLabel={(option) => {
        return getMetroPresentation(option);
      }}
      value={metroStation}
      options={city.metroStations!}
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
            validators={['required']}
            value={metroStation}
            name={'metroStation'}
            errorMessages={[t('common:errorRequiredField')]}
            label={t('post:metroStation')}
            input={{
              type: 'text',
              fullWidth: true,
              ref: params.InputProps.ref,
              inputProps,
            }}
          />
        );
      }}
    />
  );
};

export default MetroInput;
