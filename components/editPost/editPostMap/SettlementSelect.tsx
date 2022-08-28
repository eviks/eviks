import React, { FC, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import Hidden from '@mui/material/Hidden';
import CitySelection from '../../selections/CitySelection';
import DistrictSelection from '../../selections/DistrictSelection';
import { getSettlementPresentation } from '../../../utils';
import { Settlement, AddressError } from '../../../types';

const SettlementSelect: FC<{
  city: Settlement;
  district?: Settlement | null;
  subdistrict?: Settlement | null;
  setMapState: (name: string, value: any) => void;
  setMapCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
  addressError: AddressError;
  setAddressError: React.Dispatch<React.SetStateAction<AddressError>>;
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
    setAddressError((prevState) => {
      return { ...prevState, displayError: false };
    });
    setOpenCitySelection(true);
  };

  const handleCitySelectionClose = (value?: Settlement) => {
    setOpenCitySelection(false);
    if (value) {
      setMapState('city', value);
      setMapState('location', [0, 0]);
      setMapState('address', '');
      setMapState('district', null);
      setMapState('subdistrict', null);
      setMapState('metroStation', null);
      setMapCenter([value.y, value.x]);
    }
  };

  const handleDistrictSelectOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setAddressError((prevState) => {
      return { ...prevState, displayError: false };
    });
    setOpenDistrictSelection(true);
  };

  const handleDistrictSelectionClose = (
    districtValue?: Settlement,
    subdistrictValue?: Settlement,
  ) => {
    setOpenDistrictSelection(false);
    if (districtValue || subdistrictValue) {
      setMapState('district', districtValue);
      setMapState('subdistrict', subdistrictValue);
    }
  };

  const onClickAway = () => {
    setAddressError((prevState) => {
      return prevState ? { ...prevState, displayError: false } : prevState;
    });
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
        <ClickAwayListener onClickAway={onClickAway}>
          <Tooltip
            open={
              addressError?.errorFiled === 'city' && addressError.displayError
            }
            title={
              <Typography>
                {addressError?.errorFiled === 'city'
                  ? addressError.errorText
                  : ''}
              </Typography>
            }
            placement="bottom"
            arrow
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
          </Tooltip>
        </ClickAwayListener>

        <ClickAwayListener onClickAway={onClickAway}>
          <Tooltip
            open={
              addressError?.errorFiled === 'settlement' &&
              addressError.displayError
            }
            title={
              <Typography>
                {addressError?.errorFiled === 'settlement'
                  ? addressError.errorText
                  : ''}
              </Typography>
            }
            placement="bottom"
            arrow
          >
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
          </Tooltip>
        </ClickAwayListener>
      </Box>
      <Hidden mdUp>
        {addressError.errorFiled === 'location' &&
          addressError.displayError && (
            <Box sx={{ mb: 2, width: '100%' }}>
              {
                <Typography color={'error'}>
                  {addressError.errorText}
                </Typography>
              }
            </Box>
          )}
      </Hidden>
    </Fragment>
  );
};

export default SettlementSelect;
