import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { ValidatorForm } from 'react-material-ui-form-validator';
import StyledInput from '../../layout/StyledInput';
import GardenIcon from '../../icons/GardenIcon';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { PostFilters } from '../../../types';

interface LotSqmState {
  lotSqmMin: string;
  lotSqmMax: string;
}

const getDefaultState = (filters: PostFilters): LotSqmState => {
  const defaultLotSqmMin =
    Number(filters.lotSqmMin) > 0 ? filters.lotSqmMin?.toString() ?? '' : '';
  const defaultLotSqmMax =
    Number(filters.lotSqmMax) > 0 ? filters.lotSqmMax?.toString() ?? '' : '';

  return {
    lotSqmMin: defaultLotSqmMin,
    lotSqmMax: defaultLotSqmMax,
  };
};

const LotSqmFilter: FC<{ handleClose?: () => void }> = ({ handleClose }) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [state, setState] = useState<LotSqmState>(getDefaultState(filters));

  const { lotSqmMin, lotSqmMax } = state;

  const setLotSqmFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      lotSqmMin: Number(lotSqmMin),
      lotSqmMax: Number(lotSqmMax),
      pagination: {
        current: 1,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLotSqmFilters();
    if (handleClose) handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      {/* Lot Sqm */}
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:lotSqm')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          value={lotSqmMin}
          name="lotSqmMin"
          input={{
            id: 'lotSqmMin',
            type: 'number',
            placeholder: t('filters:valueFrom'),
            sx: {
              width: '160px',
              mr: 2,
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <GardenIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledInput
          value={lotSqmMax}
          name="lotSqmMax"
          input={{
            id: 'lotSqmMax',
            type: 'number',
            placeholder: t('filters:valueTo'),
            sx: {
              width: '140px',
            },
            onChange: handleChange,
          }}
        />
      </Box>

      <Button
        variant={'contained'}
        type="submit"
        disableElevation
        sx={{ display: 'block', mx: 'auto' }}
      >
        {t('filters:showPosts')}
      </Button>
    </ValidatorForm>
  );
};

export default LotSqmFilter;
