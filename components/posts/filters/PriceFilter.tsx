import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { ValidatorForm } from 'react-material-ui-form-validator';
import StyledInput from '../../layout/StyledInput';
import MoneyIcon from '../../icons/MoneyIcon';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { PostFilters } from '../../../types';

interface PriceState {
  priceMin: string;
  priceMax: string;
}

const getDefaultState = (filters: PostFilters): PriceState => {
  const defaultPriceMin =
    Number(filters.priceMin) > 0 ? filters.priceMin?.toString() ?? '' : '';
  const defaultPriceMax =
    Number(filters.priceMax) > 0 ? filters.priceMax?.toString() ?? '' : '';

  return {
    priceMin: defaultPriceMin,
    priceMax: defaultPriceMax,
  };
};

const PriceFilter: FC = () => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [state, setState] = useState<PriceState>(getDefaultState(filters));

  const { priceMin, priceMax } = state;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const isBoolean = name === 'haggle';

    setState((prevState) => {
      return { ...prevState, [name]: isBoolean ? checked : value };
    });
  };

  const setPriceFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      priceMin: Number(priceMin),
      priceMax: Number(priceMax),
    });
  };

  const handleBlur = (_event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilters();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      target.blur();
    }
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
        {t('post:price')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          value={priceMin}
          name="priceMin"
          input={{
            id: 'priceMin',
            type: 'number',
            placeholder: t('filters:valueFrom'),
            sx: {
              width: '160px',
              mr: 2,
            },
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyUp: handleKeyUp,
            startAdornment: (
              <InputAdornment position="start">
                <MoneyIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledInput
          value={priceMax}
          name="priceMax"
          input={{
            id: 'priceMax',
            type: 'number',
            placeholder: t('filters:valueTo'),
            sx: {
              width: '140px',
            },
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyUp: handleKeyUp,
          }}
        />
      </Box>
    </ValidatorForm>
  );
};

export default PriceFilter;
