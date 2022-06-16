import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => {
  const borderColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[400]
      : theme.palette.grey[800];

  return {
    '& .MuiToggleButtonGroup-grouped': {
      margin: `${theme.spacing(0.5).toString()} !important`,
      width: '3rem',
      height: '3rem',
      border: 0,
      '&:not(:first-of-type)': {
        border: `1px solid ${borderColor.toString()}`,
        borderRadius: '50%',
      },
      '&:first-of-type': {
        border: `1px solid ${borderColor.toString()}`,
        borderRadius: '50%',
      },
    },
    '.Mui-selected': {
      border: '0 !important',
      color: `${theme.palette.primary.contrastText.toString()} !important`,
      backgroundColor: `${theme.palette.primary.main.toString()} !important`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main.toString()} !important`,
      },
    },
  };
});

const RoomsFilter: FC<{ handleClose?: () => void }> = ({ handleClose }) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [rooms, setRooms] = useState<number[]>(filters.rooms);

  const setRoomsFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      rooms,
      pagination: {
        current: 1,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setRoomsFilters();
    if (handleClose) handleClose();
  };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: number[],
  ) => {
    setRooms(value);
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:rooms')}
      </Typography>
      <StyledToggleButtonGroup
        color="primary"
        value={rooms}
        onChange={handleChange}
        sx={{ mb: 1 }}
      >
        <ToggleButton value={1}>1</ToggleButton>
        <ToggleButton value={2}>2</ToggleButton>
        <ToggleButton value={3}>3</ToggleButton>
        <ToggleButton value={4}>4</ToggleButton>
        <ToggleButton value={5}>5 +</ToggleButton>
      </StyledToggleButtonGroup>
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

export default RoomsFilter;
