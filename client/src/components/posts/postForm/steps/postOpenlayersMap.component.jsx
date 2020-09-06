import React, { Fragment, useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  updatePostFormAttributes,
  updateAddressSuggestions
} from '../../../../actions/post'
import RegionSelect from './regionSelect.component'
import Input from '../../../layout/form/input/input.component'
import AddressDropdown from './addressDropdown.component'
import { fromEPSG4326 } from 'ol/proj/epsg3857'
import { initMap } from '../../../layout/mapAssets/initMap'
import VectorLayerComponent from './VectorLayer.component'
import Spinner from '../../../layout/spinner/spinner.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import 'ol/ol.css'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const OpenlayersMap = ({
  postForm: { searchArea, address, location },
  async: { loading, loadingElements },
  updatePostFormAttributes,
  updateAddressSuggestions,
  validationErrors
}) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [dropdownList, setDropdownList] = useState([])

  const getRegionLocation = () => {
    if (searchArea[0] !== 0 && searchArea[1] !== 0) return searchArea
    return [49.867092, 40.409264]
  }

  const regionLocation = getRegionLocation()

  useEffect(() => {
    let mapCenter
    let zoom

    if (!mapRef.current) return

    if (location[0] !== 0 && location[1] !== 0) {
      mapCenter = location
      zoom = 18
    } else {
      mapCenter = regionLocation
      zoom = 12
    }
    setMap(initMap(mapRef.current, mapCenter, zoom))
    // eslint-disable-next-line
  }, [mapRef])

  useEffect(() => {
    if (!map) return

    if (location[0] !== 0 && location[1] !== 0) {
      map.getView().animate({
        center: fromEPSG4326(location),
        zoom: 18,
        duration: 1000
      })
    } else {
      map.getView().animate({
        center: fromEPSG4326(regionLocation),
        zoom: 13,
        duration: 1000
      })
    }
    // eslint-disable-next-line
  }, [location])

  // Timer for typing delay
  let timerRef = useRef(null)

  const handleAddressChange = event => {
    event.persist()

    updatePostFormAttributes({ [event.target.name]: event.target.value })

    const duration = 500
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      updateAddressSuggestions(event.target.value, setDropdownList)
    }, duration)
  }

  const [t] = useTranslation()

  return (
    <FadeInDiv className="step-map">
      <h3 className="step-title my-1">{t('createPost.mapInfo.title')}</h3>
      <RegionSelect />
      {validationErrors.city && (
        <div className="field-required">{t(validationErrors.city)}</div>
      )}
      <Fragment>
        <Input
          mask={false}
          options={{
            type: 'text',
            name: 'address',
            value: address,
            placeholder: t('form.addressPlaceholder'),
            style: { width: '100%' }
          }}
          onChange={handleAddressChange}
          loading={loading}
          error={validationErrors.address}
        />
        <AddressDropdown
          list={dropdownList}
          setDropdownList={setDropdownList}
        />
      </Fragment>
      <div className="map-wrapper">
        {loading && loadingElements.includes('mapIsLoading') && (
          <div className="map-loading">
            <Spinner className="map-loading-spinner" />
          </div>
        )}
        <div className="map" ref={mapRef}>
          {map && <VectorLayerComponent map={map} />}
        </div>
      </div>
    </FadeInDiv>
  )
}

OpenlayersMap.propTypes = {
  postForm: PropTypes.object.isRequired,
  async: PropTypes.object.isRequired,
  validationErrors: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  async: state.async,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, {
  updatePostFormAttributes,
  updateAddressSuggestions
})(OpenlayersMap)
