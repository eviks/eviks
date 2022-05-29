import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import StyledToggleButtonRounded from '../../layout/StyledToggleButtonRounded';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import ApartmentIcon from '../../icons/ApartmentIcon';
import HouseIcon from '../../icons/HouseIcon';
import { EstateType } from '../../../types';

const EstateTypeFilter: FC<{ handleClose?: () => void }> = ({
  handleClose,
}) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [estateType, setEstateType] = useState<EstateType>(filters.estateType);

  const setEstateTypeFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      estateType,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEstateTypeFilters();
    if (handleClose) handleClose();
  };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: EstateType,
  ) => {
    setEstateType(value);
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:estateTypeTitle')}
      </Typography>
      <StyledToggleButtonRounded
        name="estateType"
        value={estateType}
        width={{ xs: '110px', md: '120px' }}
        height={{ xs: '110px', md: '120px' }}
        padding={3}
        onChange={handleChange}
        toggleProps={{
          sx: { mb: 4, display: 'flex', justifyContent: 'center' },
        }}
        values={[
          {
            value: EstateType.apartment,
            description: t('post:apartment'),
            icon: <ApartmentIcon />,
          },
          {
            value: EstateType.house,
            description: t('post:house'),
            icon: <HouseIcon />,
          },
        ]}
      />
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

export default EstateTypeFilter;
