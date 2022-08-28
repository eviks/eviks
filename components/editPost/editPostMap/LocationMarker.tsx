import React, { FC, useEffect } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { icon } from 'leaflet';
import { getAddressByCoords } from '../../../actions/post';
import { AddressError } from '../../../types';

const LocationMarker: FC<{
  location: [number, number];
  mapCenter: [number, number];
  setMapState: (name: string, value: any) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressError: React.Dispatch<React.SetStateAction<AddressError>>;
}> = ({ location, mapCenter, setMapState, setLoading, setAddressError }) => {
  const map = useMapEvents({
    async click(event) {
      setLoading(true);

      setMapState('location', [event.latlng.lng, event.latlng.lat]);

      try {
        const response = await getAddressByCoords({
          lng: 'az',
          x: event.latlng.lng,
          y: event.latlng.lat,
        });

        setMapState('address', response.address);
        setMapState('city', response.city);
        setMapState('district', response.district || null);
        setMapState('subdistrict', response.subdistrict || null);

        setAddressError((prevState) => {
          return { ...prevState, displayError: false };
        });
      } catch (error) {
        // no user notification
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    if (location[0] !== 0 && location[1] !== 0) {
      map.flyTo([location[1], location[0]], map.getZoom());
    } else {
      map.flyTo([mapCenter[0], mapCenter[1]], map.getZoom());
    }
  }, [map, location, mapCenter]);

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
