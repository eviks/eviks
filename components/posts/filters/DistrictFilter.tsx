import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Link from '@mui/material/Link';
import DistrictSelection from '../../selections/DistrictSelection';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { Settlement } from '../../../types';

const DistrictFilter: FC = () => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [openDistrictSelection, setOpenDistrictSelection] =
    useState<boolean>(false);

  const handleDistrictSelectionOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenDistrictSelection(true);
  };

  const handleDistrictSelectionClose = (
    selectedDistricts?: Settlement[],
    selectedSubdistricts?: Settlement[],
  ) => {
    setOpenDistrictSelection(false);
    if (selectedDistricts || selectedSubdistricts) {
      pushToNewPostsRoute({
        ...filters,
        districts: selectedDistricts ?? [],
        subdistricts: selectedSubdistricts ?? [],
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return filters.city ? (
    <ValidatorForm onSubmit={handleSubmit}>
      <Link
        component="button"
        variant="h6"
        underline="none"
        onClick={handleDistrictSelectionOnClick}
      >
        {t('filters:district')}
      </Link>
      <DistrictSelection
        city={filters.city}
        multiple
        defaultDistricts={filters.districts}
        defaultSubdistricts={filters.subdistricts}
        open={openDistrictSelection}
        onCloseMultiple={handleDistrictSelectionClose}
      />
    </ValidatorForm>
  ) : null;
};

export default DistrictFilter;
