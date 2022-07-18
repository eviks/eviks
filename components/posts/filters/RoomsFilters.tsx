import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import StyledToggleButtonRoundedSm from '../../layout/StyledToggleButtonRoundedSm';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';

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
      <StyledToggleButtonRoundedSm
        name="rooms"
        value={rooms}
        onChange={handleChange}
        values={[
          {
            value: 1,
            description: '1',
          },
          {
            value: 2,
            description: '2',
          },
          {
            value: 3,
            description: '3',
          },
          {
            value: 4,
            description: '4',
          },
          {
            value: 5,
            description: '5 +',
          },
        ]}
        toggleProps={{ sx: { mb: 1 } }}
      />
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

export default RoomsFilter;
