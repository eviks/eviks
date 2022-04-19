import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StyledInput from '../StyledInput';
import { AppContext } from '../../store/appContext';
import { updatePost } from '../../actions/post';
import { MetroStation } from '../../types';
import getMetroPresentation from '../../utils/getMetroPresentation';

interface MetroState {
  metroStation?: MetroStation | null;
}

const EditPostMetro: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const [metroState, setMetroState] = useState<MetroState>({
    metroStation: (post.lastStep || -1) >= 2 ? post.metroStation || null : null,
  });

  const { metroStation } = metroState;

  const handleAutocompleteChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: MetroStation | null,
  ) => {
    setMetroState((prevState) => {
      return {
        ...prevState,
        metroStation: newValue,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    updatePost({
      ...post,
      ...metroState,
      metroStation: metroStation || undefined,
      step: 3,
      lastStep: Math.max(2, post.lastStep ?? 2),
    })(dispatch);
  };

  const handlePrevStepClick = () => {
    updatePost({
      ...post,
      ...metroState,
      metroStation: metroStation || undefined,
      step: 1,
      lastStep: Math.max(2, post.lastStep ?? 2),
    })(dispatch);
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Container
        disableGutters
        sx={{
          py: { md: 5 },
          px: { md: 20, sx: 0 },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'start',
        }}
      >
        <Autocomplete
          disablePortal
          id="metroStation"
          getOptionLabel={(option) => {
            return getMetroPresentation(option);
          }}
          value={metroStation}
          options={post.city.metroStations!}
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
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type={'button'}
            variant="contained"
            color="secondary"
            sx={{ mt: 1, py: 1 }}
            onClick={handlePrevStepClick}
          >
            {t('post:back')}
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 1, py: 1 }}>
            {t('post:next')}
          </Button>
        </Container>
      </Container>
    </ValidatorForm>
  );
};

export default EditPostMetro;
