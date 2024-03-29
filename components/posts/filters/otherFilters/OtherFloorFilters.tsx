import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import StyledInput from '../../../layout/StyledInput';
import ElevatorIcon from '../../../icons/ElevatorIcon';

interface OtherFloorFiltersProps {
  totalFloorsMin: string;
  totalFloorsMax: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OtherFloorFilters: FC<OtherFloorFiltersProps> = ({
  totalFloorsMin,
  totalFloorsMax,
  handleChange,
}) => {
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Total floors */}
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:totalFloors')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          input={{
            id: 'totalFloorsMin',
            name: 'totalFloorsMin',
            value: totalFloorsMin,
            type: 'number',
            placeholder: t('filters:valueFrom'),
            sx: {
              width: '160px',
              mr: 2,
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <ElevatorIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledInput
          input={{
            id: 'totalFloorsMax',
            name: 'totalFloorsMax',
            value: totalFloorsMax,
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

export default OtherFloorFilters;
