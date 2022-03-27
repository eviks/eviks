import React, { FC } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { Post } from '../../types';
import 'leaflet/dist/leaflet.css';

const PostDetailedMap: FC<{ post: Post; height: number }> = ({
  post,
  height,
}) => {
  const customIcon = L.icon({
    iconUrl: '/svg/location.svg',
    iconSize: [60, 55],
    iconAnchor: [30, 50],
  });

  return (
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
  );
};

export default PostDetailedMap;
