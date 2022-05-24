import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { ValidatorForm } from 'react-material-ui-form-validator';
import StyledInput from '../../layout/StyledInput';
import SqmIcon from '../../icons/SqmIcon';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { PostFilters } from '../../../types';

interface SqmState {
  sqmMin: string;
  sqmMax: string;
  livingRoomsSqmMin: string;
  livingRoomsSqmMax: string;
  kitchenSqmMin: string;
  kitchenSqmMax: string;
}

const getDefaultState = (filters: PostFilters): SqmState => {
  const defaultSqmMin =
    Number(filters.sqmMin) > 0 ? filters.sqmMin?.toString() ?? '' : '';
  const defaultSqmMax =
    Number(filters.sqmMax) > 0 ? filters.sqmMax?.toString() ?? '' : '';

  const defaultLivingRoomsSqmMin =
    Number(filters.livingRoomsSqmMin) > 0
      ? filters.livingRoomsSqmMin?.toString() ?? ''
      : '';
  const defaultLivingRoomsSqmMax =
    Number(filters.livingRoomsSqmMax) > 0
      ? filters.livingRoomsSqmMax?.toString() ?? ''
      : '';

  const defaultKitchenSqmMin =
    Number(filters.kitchenSqmMin) > 0
      ? filters.kitchenSqmMin?.toString() ?? ''
      : '';
  const defaultKitchenSqmMax =
    Number(filters.kitchenSqmMax) > 0
      ? filters.kitchenSqmMax?.toString() ?? ''
      : '';

  return {
    sqmMin: defaultSqmMin,
    sqmMax: defaultSqmMax,
    livingRoomsSqmMin: defaultLivingRoomsSqmMin,
    livingRoomsSqmMax: defaultLivingRoomsSqmMax,
    kitchenSqmMin: defaultKitchenSqmMin,
    kitchenSqmMax: defaultKitchenSqmMax,
  };
};

const SqmFilter: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [state, setState] = useState<SqmState>(getDefaultState(filters));

  const {
    sqmMin,
    sqmMax,
    livingRoomsSqmMin,
    livingRoomsSqmMax,
    kitchenSqmMin,
    kitchenSqmMax,
  } = state;

  const setSqmFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      sqmMin: Number(sqmMin),
      sqmMax: Number(sqmMax),
      livingRoomsSqmMin: Number(livingRoomsSqmMin),
      livingRoomsSqmMax: Number(livingRoomsSqmMax),
      kitchenSqmMin: Number(kitchenSqmMin),
      kitchenSqmMax: Number(kitchenSqmMax),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSqmFilters();
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      {/* Sqm */}
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:sqm')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          value={sqmMin}
          name="sqmMin"
          input={{
            id: 'sqmMin',
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
          value={sqmMax}
          name="sqmMax"
          input={{
            id: 'sqmMax',
            type: 'number',
            placeholder: t('filters:valueTo'),
            sx: {
              width: '140px',
            },
            onChange: handleChange,
          }}
        />
      </Box>
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
      <Button
        variant={'contained'}
        type="submit"
        sx={{ display: 'block', mx: 'auto' }}
      >
        {t('filters:showPosts')}
      </Button>
    </ValidatorForm>
  );
};

export default SqmFilter;
