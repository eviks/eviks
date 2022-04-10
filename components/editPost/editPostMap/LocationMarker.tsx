import React, { FC } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { icon } from 'leaflet';
import { getAddressByCoords } from '../../../actions/post';
import { MapState } from '../../../types';

const LocationMarker: FC<{
  location: [number, number];
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ location, setMapState, setLoading }) => {
  const map = useMapEvents({
    async click(event) {
      setLoading(true);

      setMapState((prevState) => {
        return { ...prevState, location: [event.latlng.lng, event.latlng.lat] };
      });

      map.flyTo(event.latlng, map.getZoom());

      try {
        const response = await getAddressByCoords({
          lng: 'az',
          x: event.latlng.lng,
          y: event.latlng.lat,
        });

        setMapState((prevState) => {
          return {
            ...prevState,
            ...response,
          };
        });
      } catch (error) {
        // no user notification
      }

      setLoading(false);
    },
  });

  const customIcon = icon({
    iconUrl: '/svg/location.svg',
    iconSize: [60, 55],
    iconAnchor: [30, 50],
  });

  return location[0] === 0 && location[1] === 0 ? null : (
    <Marker position={[location[1], location[0]]} icon={customIcon} />
  );
};

export default LocationMarker;
