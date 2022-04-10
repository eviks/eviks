import React, { FC, useContext, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme, alpha } from '@mui/material/styles';
import LocationMarker from './LocationMarker';
import AddressInput from './AddressInput';
import { AppContext } from '../../../store/appContext';
import { MapState } from '../../../types';
import 'leaflet/dist/leaflet.css';

const EditPostMap: FC<{ height: number | string }> = ({ height }) => {
  const {
    state: { post },
  } = useContext(AppContext);

  const theme = useTheme();

  const [mapstate, setMapState] = useState<MapState>({
    location: post.location,
    city: post.city,
    district: (post.lastStep || -1) >= 1 ? post.district : undefined,
    subdistrict: (post.lastStep || -1) >= 1 ? post.subdistrict : undefined,
    address: post.address,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { city, district, subdistrict, location, address } = mapstate;

  const mapCenter: [number, number] =
    post.location[0] === 0 && post.location[1] === 0
      ? [post.city.y ?? 0, post.city.x ?? 0]
      : [post.location[1], post.location[0]];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container
      disableGutters
      sx={{ py: { md: 5, xs: 0 }, px: { md: 10, sx: 0 } }}
    >
      <ValidatorForm onSubmit={handleSubmit}>
        {`${city.name} ${district?.name}`}
        <AddressInput city={city} address={address} setMapState={setMapState} />
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{
            height,
            width: '100%',
            borderRadius: '20px',
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
            setMapState={setMapState}
            setLoading={setLoading}
          />
        </MapContainer>
      </ValidatorForm>
    </Container>
  );
};

export default EditPostMap;
