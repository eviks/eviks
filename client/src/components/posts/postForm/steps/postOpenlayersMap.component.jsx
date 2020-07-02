import React, { useState, useRef, useEffect } from 'react'
import 'ol/ol.css'
import { fromEPSG4326 } from 'ol/proj/epsg3857'
import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import OSM, { ATTRIBUTION } from 'ol/source/OSM'
import VectorLayerComponent from './VectorLayer.component'
import { FullScreen, ScaleLine, defaults as DefaultControls } from 'ol/control'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const OpenlayersMap = () => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (mapRef.current) {
      setMap(
        new Map({
          target: mapRef.current,
          layers: [
            new TileLayer({
              source: new OSM({
                url:
                  'http://maps.gomap.az/info/xyz.do?lng=az&x={x}&y={y}&z={z}&f=jpg',
                attributions: [
                  "(c) <a href='http://gomap.az/'>GoMap.Az</a>",
                  ATTRIBUTION
                ]
              })
            })
          ],
          controls: DefaultControls().extend([
            new ScaleLine(),
            new FullScreen()
          ]),
          view: new View({
            projection: 'EPSG:3857',
            center: fromEPSG4326([49.867092, 40.409264]),
            zoom: 12
          })
        })
      )
    }
  }, [mapRef])

  const [t] = useTranslation()

  return (
    <FadeInDiv className="step-map">
      <h3 className="step-title my-1">{t('createPost.mapInfo.title')}</h3>
      <div className="map-wrapper">
        <div className="map" ref={mapRef}>
          {map && <VectorLayerComponent map={map} />}
        </div>
      </div>
    </FadeInDiv>
  )
}

export default OpenlayersMap
