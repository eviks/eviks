import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import Toolbar from '@mui/material/Toolbar';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { AppContext } from '../../../store/appContext';
import {
  getSettlementPresentation,
  getMetroPresentation,
} from '../../../utils';

const DistrictsBar: FC = () => {
  const router = useRouter();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const handleDistrictDelete = (id: string) => {
    pushToNewPostsRoute({
      ...filters,
      districts: filters.districts.filter((district) => {
        return district.id !== id;
      }),
      pagination: {
        current: 1,
      },
    });
  };

  const handleSubdistrictDelete = (id: string) => {
    pushToNewPostsRoute({
      ...filters,
      subdistricts: filters.subdistricts.filter((subdistrict) => {
        return subdistrict.id !== id;
      }),
      pagination: {
        current: 1,
      },
    });
  };

  const handleMetroStationDelete = (id: number) => {
    pushToNewPostsRoute({
      ...filters,
      metroStations: filters.metroStations.filter((metroStation) => {
        return metroStation._id !== id;
      }),
      pagination: {
        current: 1,
      },
    });
  };

  return filters.districts.length > 0 ||
    filters.subdistricts.length > 0 ||
    filters.metroStations.length > 0 ? (
    <Toolbar
      variant="dense"
      sx={{
        gap: 2,
        width: 'max-content',
        mx: { lg: 10 },
        mb: 2,
      }}
    >
      {filters.districts.map((district) => {
        return (
          <Chip
            key={district.id}
            label={getSettlementPresentation(district, router.locale)}
            variant="outlined"
            onDelete={() => {
              return handleDistrictDelete(district.id);
            }}
          />
        );
      })}
      {filters.subdistricts.map((subdistrict) => {
        return (
          <Chip
            key={subdistrict.id}
            label={getSettlementPresentation(subdistrict, router.locale)}
            variant="outlined"
            onDelete={() => {
              return handleSubdistrictDelete(subdistrict.id);
            }}
          />
        );
      })}
      {filters.metroStations.map((metroStation) => {
        return (
          <Chip
            key={metroStation._id}
            label={getMetroPresentation(metroStation, router.locale)}
            variant="outlined"
            onDelete={() => {
              return handleMetroStationDelete(metroStation._id);
            }}
          />
        );
      })}
    </Toolbar>
  ) : null;
};

export default DistrictsBar;
