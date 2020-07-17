import React, { useState, useRef, useEffect } from 'react'
import DivisionSelect from './divisionSelect.component'
import { fromEPSG4326 } from 'ol/proj/epsg3857'
import { initMap } from '../../../layout/mapAssets/initMap'
import VectorLayerComponent from './VectorLayer.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'

import 'ol/ol.css'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const OpenlayersMap = () => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [defaultCenter, changeMapCenter] = useState(null)

  useEffect(() => {
    if (map && defaultCenter) {
      map.getView().animate({
        center: fromEPSG4326(defaultCenter),
        zoom: 13,
        duration: 1000
      })
    }
    // eslint-disable-next-line
  }, [defaultCenter])

  useEffect(() => {
    if (mapRef.current)
      setMap(initMap(mapRef.current, [49.867092, 40.409264], 12))
  }, [mapRef])

  const [t] = useTranslation()

  return (
    <FadeInDiv className="step-map">
      <h3 className="step-title my-1">{t('createPost.mapInfo.title')}</h3>
      <DivisionSelect changeMapCenter={changeMapCenter} />
      <div className="map-wrapper">
        <div className="map" ref={mapRef}>
          {map && <VectorLayerComponent map={map} />}
        </div>
      </div>
    </FadeInDiv>
  )
}

export default OpenlayersMap
