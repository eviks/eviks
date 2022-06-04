import React, { FC, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CitySelection from '../../selections/CitySelection';
import DistrictSelection from '../../selections/DistrictSelection';
import { getSettlementPresentation } from '../../../utils';
import { MapState, Settlement } from '../../../types';

const SettlementSelect: FC<{
  city: Settlement;
  district?: Settlement;
  subdistrict?: Settlement;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
  setMapCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
  addressError: string;
  setAddressError: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  city,
  district,
  subdistrict,
  setMapState,
  setMapCenter,
  addressError,
  setAddressError,
}) => {
  const router = useRouter();

  const { t } = useTranslation();

  const [openCitySelection, setOpenCitySelection] = useState<boolean>(false);
  const [openDistrictSelection, setOpenDistrictSelection] =
    useState<boolean>(false);

  const getDistrictPresentation = () => {
    let presentation = '';
    presentation = district
      ? getSettlementPresentation(district, router.locale)
      : t('post:districtNotSelected');

    if ((district?.children?.length ?? 0) > 0) {
      presentation = `${presentation}, ${
        subdistrict
          ? getSettlementPresentation(subdistrict, router.locale)
          : t('post:subdistrictNotSelected')
      }`;
    }
    return presentation;
  };

  const handleCitySelectionOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenCitySelection(true);
  };

  const handleCitySelectionClose = (value?: Settlement) => {
    setOpenCitySelection(false);
    setAddressError('');
    if (value) {
      setMapState((prevState) => {
        return {
          ...prevState,
          city: value,
          location: [0, 0],
          district: undefined,
          subdistrict: undefined,
        };
      });
      setMapCenter([value.y, value.x]);
    }
  };

  const handleDistrictSelectOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenDistrictSelection(true);
  };

  const handleDistrictSelectionClose = (
    districtValue?: Settlement,
    subdistrictValue?: Settlement,
  ) => {
    setOpenDistrictSelection(false);
    setAddressError('');
    if (districtValue || subdistrictValue) {
      setMapState((prevState) => {
        return {
          ...prevState,
          district: districtValue,
          subdistrict: subdistrictValue,
        };
      });
    }
  };

  return (
    <Fragment>
      <Box
        sx={{
          mb: { xs: 0, md: 2 },
          display: 'flex',
          alignItems: 'start',
          flexDirection: { xs: 'row', md: 'column' },
          gap: '10px',
        }}
      >
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography sx={{ mr: 1 }}>{`${t('post:city')}:`}</Typography>
          <Link
            component="button"
            variant="body1"
            underline="none"
            onClick={handleCitySelectionOnClick}
          >
            {getSettlementPresentation(city, router.locale)}
          </Link>
          <CitySelection
            open={openCitySelection}
            onClose={handleCitySelectionClose}
          />
        </Box>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography sx={{ mr: 1 }}>{`${t('post:district')}:`}</Typography>
          <Link
            component="button"
            variant="body1"
            underline="none"
            onClick={handleDistrictSelectOnClick}
          >
            {getDistrictPresentation()}
          </Link>
          <DistrictSelection
            city={city}
            defaultDistricts={[]}
            defaultSubdistricts={[]}
            multiple={false}
            open={openDistrictSelection}
            onClose={handleDistrictSelectionClose}
          />
        </Box>
      </Box>
      {addressError && (
        <Box sx={{ mb: 2, width: '100%' }}>
          {<Typography color={'error'}>{addressError}</Typography>}
        </Box>
      )}
    </Fragment>
  );
};

export default SettlementSelect;
