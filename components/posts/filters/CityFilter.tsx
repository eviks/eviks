import React, { FC, useState, useContext } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useRouter } from 'next/router';
import Link from '@mui/material/Link';
import CitySelection from '../../selections/CitySelection';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { getSettlementPresentation } from '../../../utils';
import { Settlement } from '../../../types';

const CityFilter: FC = () => {
  const router = useRouter();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [openCitySelection, setOpenCitySelection] = useState<boolean>(false);

  const handleCitySelectionOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenCitySelection(true);
  };

  const handleCitySelectionClose = (value?: Settlement) => {
    setOpenCitySelection(false);
    if (value) {
      pushToNewPostsRoute({
        ...filters,
        city: value,
        districts: [],
        subdistricts: [],
        metroStations: [],
        pagination: {
          current: 1,
        },
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
        onClick={handleCitySelectionOnClick}
      >
        {getSettlementPresentation(filters.city, router.locale)}
      </Link>
      <CitySelection
        open={openCitySelection}
        onClose={handleCitySelectionClose}
      />
    </ValidatorForm>
  ) : null;
};

export default CityFilter;
