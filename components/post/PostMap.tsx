import React, { FC, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@mui/material/Typography';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { icon } from 'leaflet';
import { Post } from '../../types';
import 'leaflet/dist/leaflet.css';

const PostMap: FC<{ post: Post; height: number }> = ({ post, height }) => {
  const { t } = useTranslation();

  const customIcon = icon({
    iconUrl: '/svg/location.svg',
    iconSize: [60, 55],
    iconAnchor: [30, 50],
  });

  return (
    <Fragment>
      <Typography fontWeight={'bold'} fontSize={24} sx={{ mb: 0.5 }}>
        {t('post:location')}
      </Typography>
      <MapContainer
        center={[post.location[1], post.location[0]]}
        zoom={13}
        style={{
          height,
          width: '100%',
          borderRadius: '20px',
          marginBottom: '2rem',
        }}
      >
        <TileLayer
          attribution="(c) <a href='http://gomap.az/'>GoMap.Az</a>"
          url="http://maps.gomap.az/info/xyz.do?lng=az&x={x}&y={y}&z={z}&f=jpg"
        />
        <Marker
          position={[post.location[1], post.location[0]]}
          icon={customIcon}
        />
      </MapContainer>
    </Fragment>
  );
};

export default PostMap;
