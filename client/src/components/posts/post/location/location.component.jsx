import React from 'react'
import { Map, Placemark } from 'react-yandex-maps'
import PropTypes from 'prop-types'

const Location = ({ coordinate }) => {
  const mapData = {
    center: coordinate,
    zoom: 13
  }

  return (
    <div className="my-1">
      <h2>Расположение</h2>
      <Map
        style={{ width: '100%', height: '45vh', borderRadius: '8px' }}
        defaultState={mapData}
      >
        <Placemark geometry={coordinate} />
      </Map>
    </div>
  )
}

Location.propTypes = {
  coordinate: PropTypes.array.isRequired
}

export default Location
