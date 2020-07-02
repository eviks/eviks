import React from 'react'
import {
  Map,
  Placemark,
  FullscreenControl,
  ZoomControl,
  TypeSelector,
  GeolocationControl,
} from 'react-yandex-maps'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Location = ({ coordinate }) => {
  const mapData = {
    center: coordinate,
    zoom: 13,
    controls: [],
  }

  const [t] = useTranslation()

  return (
    <div className="my-1">
      <h2 className="my-1">{t('post.location.title')}</h2>
      <Map
        style={{ width: '100%', height: '45vh', borderRadius: '8px' }}
        defaultState={mapData}
      >
        <Placemark geometry={coordinate} />
        <FullscreenControl />
        <ZoomControl />
        <TypeSelector />
        <GeolocationControl />
      </Map>
    </div>
  )
}

Location.propTypes = {
  coordinate: PropTypes.array.isRequired,
}

export default Location