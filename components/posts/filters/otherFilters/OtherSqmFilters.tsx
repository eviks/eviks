import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import StyledInput from '../../../layout/StyledInput';
import SqmIcon from '../../../icons/SqmIcon';

interface OtherSqmFiltersProps {
  livingRoomsSqmMin: string;
  livingRoomsSqmMax: string;
  kitchenSqmMin: string;
  kitchenSqmMax: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OtherSqmFilters: FC<OtherSqmFiltersProps> = ({
  livingRoomsSqmMin,
  livingRoomsSqmMax,
  kitchenSqmMin,
  kitchenSqmMax,
  handleChange,
}) => {
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      {/* Living rooms sqm */}
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:livingRoomsSqm')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          value={livingRoomsSqmMin}
          name="livingRoomsSqmMin"
          input={{
            id: 'livingRoomsSqmMin',
            type: 'number',
            placeholder: t('filters:valueFrom'),
            sx: {
              width: '160px',
              mr: 2,
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <SqmIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledInput
          value={livingRoomsSqmMax}
          name="livingRoomsSqmMax"
          input={{
            id: 'livingRoomsSqmMax',
            type: 'number',
            placeholder: t('filters:valueTo'),
            sx: {
              width: '140px',
            },
            onChange: handleChange,
          }}
        />
      </Box>
      {/* Kitchen sqm */}
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:kitchenSqm')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          value={kitchenSqmMin}
          name="kitchenSqmMin"
          input={{
            id: 'kitchenSqmMin',
            type: 'number',
            placeholder: t('filters:valueFrom'),
            sx: {
              width: '160px',
              mr: 2,
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <SqmIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledInput
          value={kitchenSqmMax}
          name="kitchenSqmMax"
          input={{
            id: 'kitchenSqmMax',
            type: 'number',
            placeholder: t('filters:valueTo'),
            sx: {
              width: '140px',
            },
            onChange: handleChange,
          }}
        />
      </Box>
    </ValidatorForm>
  );
};

export default OtherSqmFilters;
