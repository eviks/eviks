import React, { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CitySelect from '../../selections/CitySelect';
import { getSettlementPresentation } from '../../../utils';
import { MapState, Settlement } from '../../../types';

const SettlementSelect: FC<{
  city: Settlement;
  district?: Settlement;
  subdistrict?: Settlement;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
  setMapCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
}> = ({ city, district, subdistrict, setMapState, setMapCenter }) => {
  const { t } = useTranslation();

  const [openCitySelect, setOpenCitySelect] = useState<boolean>(false);

  const getDistrictPresentation = () => {
    let presentation = '';
    presentation = district
      ? getSettlementPresentation(district)
      : t('post:districtNotSelected');

    if ((district?.children?.length ?? 0) > 0) {
      presentation = `${presentation}, ${
        subdistrict
          ? getSettlementPresentation(subdistrict)
          : t('post:subdistrictNotSelected')
      }`;
    }
    return presentation;
  };

  const handleCitySelectOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenCitySelect(true);
  };

  const handleCitySelectClose = (value?: Settlement) => {
    setOpenCitySelect(false);
    if (value) {
      setMapState((prevState) => {
        return {
          ...prevState,
          city: value,
          address: '',
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
  };

  return (
    <Box
      sx={{
        mb: { xs: 0, md: 2 },
        display: 'flex',
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
          onClick={handleCitySelectOnClick}
        >
          {getSettlementPresentation(city)}
        </Link>
        <CitySelect open={openCitySelect} onClose={handleCitySelectClose} />
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
      </Box>
    </Box>
  );
};

export default SettlementSelect;
