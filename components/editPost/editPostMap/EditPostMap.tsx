import React, { FC, useContext, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme, alpha } from '@mui/material/styles';
import LocationMarker from './LocationMarker';
import AddressInput from './AddressInput';
import MetroInput from './MetroInput';
import SettlementSelect from './SettlementSelect';
import StepTitle from '../StepTitle';
import { AppContext } from '../../../store/appContext';
import { updatePost } from '../../../actions/post';
import { MapState } from '../../../types';
import 'leaflet/dist/leaflet.css';

const EditPostMap: FC<{ height: number | string }> = ({ height }) => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const theme = useTheme();

  const [mapstate, setMapState] = useState<MapState>({
    location: post.location,
    city: post.city,
    district: (post.lastStep || -1) >= 1 ? post.district : undefined,
    subdistrict: (post.lastStep || -1) >= 1 ? post.subdistrict : undefined,
    address: post.address,
    metroStation: (post.lastStep || -1) >= 1 ? post.metroStation || null : null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string>('');

  const { city, district, subdistrict, location, address, metroStation } =
    mapstate;

  const defaultmapCenter: [number, number] =
    post.location[0] === 0 && post.location[1] === 0
      ? [post.city.y ?? 0, post.city.x ?? 0]
      : [post.location[1], post.location[0]];

  const [mapCenter, setMapCenter] = useState(defaultmapCenter);

  const updatePostAndDispatch = (step: number) => {
    updatePost({
      ...post,
      ...mapstate,
      metroStation: metroStation || undefined,
      step,
      lastStep: Math.max(1, post.lastStep ?? 1),
    })(dispatch);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (location[0] === 0 || location[1] === 0) {
      setAddressError(t('post:wrongAddress'));
      return;
    }

    if (!city) {
      setAddressError(t('post:cityError'));
      return;
    }

    if (!district) {
      setAddressError(t('post:districtError'));
      return;
    }

    if ((district.children?.length ?? 0) > 0 && !subdistrict) {
      setAddressError(t('post:subdistrictError'));
      return;
    }

    updatePostAndDispatch(2);
  };

  const handlePrevStepClick = () => {
    updatePostAndDispatch(0);
  };

  return (
    <Container
      disableGutters
      sx={{
        py: { md: 5, xs: 0 },
        height: { xs: '100vh', md: 'auto' },
      }}
    >
      <ValidatorForm onSubmit={handleSubmit}>
        <Hidden mdDown>
          <StepTitle title={t('post:address')} />
        </Hidden>
        <Hidden mdUp>
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'end',
              zIndex: 1000,
              px: 3,
              width: '100%',
              pt: 8,
              backgroundColor: theme.palette.background.default,
              borderRadius: '0px 0px 24px 24px',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <SettlementSelect
                city={city}
                district={district}
                subdistrict={subdistrict}
                setMapState={setMapState}
                setMapCenter={setMapCenter}
                addressError={addressError}
                setAddressError={setAddressError}
              />
              <AddressInput
                city={city}
                address={address}
                setMapState={setMapState}
                setMapStateLoading={setLoading}
              />
              <MetroInput
                city={city}
                metroStation={metroStation}
                setMapState={setMapState}
              />
            </Box>
          </Box>
        </Hidden>
        <Hidden mdDown>
          <SettlementSelect
            city={city}
            district={district}
            subdistrict={subdistrict}
            setMapState={setMapState}
            setMapCenter={setMapCenter}
            addressError={addressError}
            setAddressError={setAddressError}
          />
          <AddressInput
            city={city}
            address={address}
            setMapState={setMapState}
            setMapStateLoading={setLoading}
          />
        </Hidden>
        <MapContainer
          center={mapCenter}
          zoom={13}
          zoomControl={false}
          style={{
            height,
            width: '100%',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            marginBottom: '2rem',
          }}
        >
          {loading && (
            <Container
              sx={{
                position: 'absolute',
                zIndex: 500,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: alpha(theme.palette.background.default, 0.5),
              }}
            >
              <CircularProgress color="primary" size="2rem" />
            </Container>
          )}
          <TileLayer
            attribution="(c) <a href='http://gomap.az/'>GoMap.Az</a>"
            url="http://maps.gomap.az/info/xyz.do?lng=az&x={x}&y={y}&z={z}&f=jpg"
          />
          <LocationMarker
            location={location}
            mapCenter={mapCenter}
            setMapState={setMapState}
            setLoading={setLoading}
          />
        </MapContainer>
        <Hidden mdDown>
          {city.metroStations && <Divider sx={{ mb: 2 }} />}
          <MetroInput
            city={city}
            metroStation={metroStation}
            setMapState={setMapState}
          />
        </Hidden>
        <Container
          sx={{
            position: { xs: 'absolute', md: 'initial' },
            bottom: 0,
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            zIndex: 1000,
          }}
        >
          <Button
            type={'button'}
            variant="contained"
            color="secondary"
            disableElevation
            sx={{ mt: 1, py: 1 }}
            onClick={handlePrevStepClick}
          >
            {t('post:back')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{ mt: 1, py: 1 }}
          >
            {t('post:next')}
          </Button>
        </Container>
      </ValidatorForm>
    </Container>
  );
};

export default EditPostMap;
