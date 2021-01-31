import React, { useState, useEffect, useRef } from 'react'
import VectorLayer from './vectorLayer.component'
import { initMap } from '../../../layout/mapAssets/initMap'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import 'ol/ol.css'

const Location = ({ location }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (mapRef.current) setMap(initMap(mapRef.current, location, 17))
    // eslint-disable-next-line
  }, [mapRef])

  const [t] = useTranslation()

  return (
    <div className="my-1">
      <h2 className="my-1">{t('post.location.title')}</h2>
      <div ref={mapRef} style={{ width: '100%', height: '65vh' }}>
        {map && <VectorLayer map={map} location={location} />}
      </div>
    </div>
  )
}

Location.propTypes = {
  location: PropTypes.array.isRequired
}

export default Location
