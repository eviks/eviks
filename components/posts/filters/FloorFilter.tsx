import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { ValidatorForm } from 'react-material-ui-form-validator';
import StyledInput from '../../layout/StyledInput';
import ElevatorIcon from '../../icons/ElevatorIcon';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { PostFilters } from '../../../types';

interface FloorState {
  floorMin: string;
  floorMax: string;
}

const getDefaultState = (filters: PostFilters): FloorState => {
  const defaultFloorMin =
    Number(filters.floorMin) > 0 ? filters.floorMin?.toString() ?? '' : '';
  const defaultFloorMax =
    Number(filters.floorMax) > 0 ? filters.floorMax?.toString() ?? '' : '';

  return {
    floorMin: defaultFloorMin,
    floorMax: defaultFloorMax,
  };
};

const FloorFilter: FC<{ handleClose?: () => void }> = ({ handleClose }) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [state, setState] = useState<FloorState>(getDefaultState(filters));

  const { floorMin, floorMax } = state;

  const setFloorFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      floorMin: Number(floorMin),
      floorMax: Number(floorMax),
      pagination: {
        current: 1,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFloorFilters();
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
      {/* Floor */}
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:floor')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          value={floorMin}
          name="floorMin"
          input={{
            id: 'floorMin',
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
          value={floorMax}
          name="floorMax"
          input={{
            id: 'floorMax',
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

export default FloorFilter;
