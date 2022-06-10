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
}

const getDefaultState = (filters: PostFilters): SqmState => {
  const defaultSqmMin =
    Number(filters.sqmMin) > 0 ? filters.sqmMin?.toString() ?? '' : '';
  const defaultSqmMax =
    Number(filters.sqmMax) > 0 ? filters.sqmMax?.toString() ?? '' : '';

  return {
    sqmMin: defaultSqmMin,
    sqmMax: defaultSqmMax,
  };
};

const SqmFilter: FC<{ handleClose?: () => void }> = ({ handleClose }) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [state, setState] = useState<SqmState>(getDefaultState(filters));

  const { sqmMin, sqmMax } = state;

  const setSqmFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      sqmMin: Number(sqmMin),
      sqmMax: Number(sqmMax),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSqmFilters();
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
