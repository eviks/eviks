import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
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
    <form onSubmit={handleSubmit}>
      {/* Living rooms sqm */}
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:livingRoomsSqm')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          input={{
            id: 'livingRoomsSqmMin',
            name: 'livingRoomsSqmMin',
            value: livingRoomsSqmMin,
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
          input={{
            id: 'livingRoomsSqmMax',
            name: 'livingRoomsSqmMax',
            value: livingRoomsSqmMax,
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
          input={{
            id: 'kitchenSqmMin',
            name: 'kitchenSqmMin',
            value: kitchenSqmMin,
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
          input={{
            id: 'kitchenSqmMax',
            name: 'kitchenSqmMax',
            value: kitchenSqmMax,
            type: 'number',
            placeholder: t('filters:valueTo'),
            sx: {
              width: '140px',
            },
            onChange: handleChange,
          }}
        />
      </Box>
    </form>
  );
};

export default OtherSqmFilters;
