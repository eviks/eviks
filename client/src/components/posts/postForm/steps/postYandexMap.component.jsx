import React from 'react'
import {
  Map,
  FullscreenControl,
  ZoomControl,
  TypeSelector,
  GeolocationControl,
} from 'react-yandex-maps'
import PropTypes from 'prop-types'

const PostMap = () => {
  const mapData = {
    center: ['40.409264', '49.867092'],
    zoom: 11,
  }

  return (
    <div>
      <Map
        style={{ width: '100%', height: '45vh', borderRadius: '8px' }}
        defaultState={mapData}
      >
        <FullscreenControl />
        <ZoomControl />
        <TypeSelector />
        <GeolocationControl />
      </Map>
    </div>
  )
}

PostMap.propTypes = {}

export default PostMap
