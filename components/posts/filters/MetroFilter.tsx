import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from '@mui/material/Link';
import MetroSelection from '../../selections/MetroSelection';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { MetroStation } from '../../../types';

const MetroFilter: FC = () => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [openMetroSelection, setOpenMetroSelection] = useState<boolean>(false);

  const handleCitySelectionOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenMetroSelection(true);
  };

  const handleMetroSelectionClose = (value?: MetroStation | MetroStation[]) => {
    setOpenMetroSelection(false);
    if (value) {
      pushToNewPostsRoute({
        ...filters,
        metroStations: value as unknown as Array<MetroStation>,
        pagination: {
          current: 1,
        },
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (filters.city.metroStations?.length ?? 0) > 0 ? (
    <form onSubmit={handleSubmit}>
      <Link
        component="button"
        variant="h6"
        underline="none"
        onClick={handleCitySelectionOnClick}
      >
        {t('filters:metro')}
      </Link>
      <MetroSelection
        city={filters.city}
        multiple
        defaultMetroStations={filters.metroStations}
        open={openMetroSelection}
        onClose={handleMetroSelectionClose}
      />
    </form>
  ) : null;
};

export default MetroFilter;
