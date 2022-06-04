import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import StyledToggleButtonRounded from '../../layout/StyledToggleButtonRounded';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import SaleIcon from '../../icons/SaleIcon';
import RentIcon from '../../icons/RentIcon';
import RentPerDayIcon from '../../icons/RentPerDayIcon';
import { DealType } from '../../../types';

const DealTypeFilter: FC<{ handleClose?: () => void }> = ({ handleClose }) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [dealType, setDealType] = useState<DealType>(filters.dealType);

  const setDealTypeFilters = () => {
    pushToNewPostsRoute({
      ...filters,
      dealType,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDealTypeFilters();
    if (handleClose) handleClose();
  };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: DealType,
  ) => {
    setDealType(value);
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
        {t('post:dealTypeTitle')}
      </Typography>
      <StyledToggleButtonRounded
        name="dealType"
        value={dealType}
        width={{ xs: '110px', md: '120px' }}
        height={{ xs: '110px', md: '120px' }}
        padding={3}
        onChange={handleChange}
        toggleProps={{
          sx: { mb: 6, display: 'flex', justifyContent: 'center' },
        }}
        values={[
          {
            value: DealType.sale,
            description: t('filters:buy'),
            icon: <SaleIcon />,
          },
          {
            value: DealType.rent,
            description: t('filters:rent'),
            icon: <RentIcon />,
          },
          {
            value: DealType.rentPerDay,
            description: t('filters:rentPerDay'),
            icon: <RentPerDayIcon />,
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

export default DealTypeFilter;
