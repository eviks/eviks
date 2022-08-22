import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StyledToggleButtonRounded from '../../layout/StyledToggleButtonRounded';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import NewBuildingIcon from '../../icons/NewBuildingIcon';
import SecondaryBuildingIcon from '../../icons/SecondaryBuildingIcon';
import { ApartmentType } from '../../../types';

const ApartmentTypeFilter: FC<{ handleClose?: () => void }> = ({
  handleClose,
}) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [apartmentType, setApartmentType] = useState<
    ApartmentType | undefined | null
  >(filters.apartmentType);

  const setApartmentTypeFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      apartmentType,
      pagination: {
        current: 1,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setApartmentTypeFilters();
    if (handleClose) handleClose();
  };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: ApartmentType,
  ) => {
    setApartmentType(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:apartmentTypeTitle')}
      </Typography>
      <StyledToggleButtonRounded
        value={apartmentType}
        toggleProps={{
          exclusive: true,
          onChange: handleChange,
          sx: { mb: 4, display: 'flex', justifyContent: 'center' },
        }}
        values={[
          {
            value: ApartmentType.newBuilding,
            description: t('post:newBuilding'),
            icon: <NewBuildingIcon />,
          },
          {
            value: ApartmentType.secondaryBuilding,
            description: t('post:secondaryBuilding'),
            icon: <SecondaryBuildingIcon />,
          },
        ]}
      />
      <Button
        variant={'contained'}
        type="submit"
        disableElevation
        sx={{ display: 'block', mx: 'auto' }}
      >
        {t('filters:showPosts')}
      </Button>
    </form>
  );
};

export default ApartmentTypeFilter;
