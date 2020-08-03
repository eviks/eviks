import React, { Fragment, useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  updatePostFormAttributes,
  updateAddressSuggestions
} from '../../../../actions/post'
import DivisionSelect from './divisionSelect.component'
import Input from '../../../layout/form/input/input.component'
import AddressDropdown from './addressDropdown.component'
import { fromEPSG4326, toEPSG4326 } from 'ol/proj/epsg3857'
import { initMap } from '../../../layout/mapAssets/initMap'
import VectorLayerComponent from './VectorLayer.component'
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
  postForm: { city, address, cityLocation },
  loading,
  updatePostFormAttributes,
  updateAddressSuggestions,
  validationErrors
}) => {
  const mapRef = useRef(null)
  const addressRef = useRef(null)
  const [map, setMap] = useState(null)
  const [dropdownList, setDropdownList] = useState([])

  useEffect(() => {
    if (map && cityLocation) {
      map.getView().animate({
        center: fromEPSG4326(cityLocation),
        zoom: 13,
        duration: 1000
      })
    }
    // eslint-disable-next-line
  }, [cityLocation])

  useEffect(() => {
    if (mapRef.current)
      setMap(initMap(mapRef.current, [49.867092, 40.409264], 12))
  }, [mapRef])

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

  const updatePlacemark = (coords, isEPSG4326 = false, newAddress = null) => {
    const formattedCoords = isEPSG4326 ? coords : toEPSG4326(coords)

    let newAttributes = { location: formattedCoords }
    if (newAddress) newAttributes.address = newAddress
    if (addressRef.current) addressRef.current.inputElement.value = newAddress
    updatePostFormAttributes(newAttributes)

    map.getView().animate({
      center: isEPSG4326 ? fromEPSG4326(coords) : coords,
      zoom: 18,
      duration: 1000
    })
  }

  const [t] = useTranslation()

  return (
    <FadeInDiv className="step-map">
      <h3 className="step-title my-1">{t('createPost.mapInfo.title')}</h3>
      <DivisionSelect />
      {validationErrors.city && (
        <div className="field-required">{t(validationErrors.city)}</div>
      )}
      {city && (
        <Fragment>
          <Input
            ref={addressRef}
            mask={false}
            options={{
              type: 'text',
              name: 'address',
              value: address,
              placeholder: t('form.addressPlaceholder'),
              style: { width: '100%' }
            }}
            onChange={e => handleAddressChange(e)}
            loading={loading}
            error={validationErrors.address}
          />
          <AddressDropdown
            list={dropdownList}
            setDropdownList={setDropdownList}
            updatePlacemark={updatePlacemark}
          />
        </Fragment>
      )}

      <div className="map-wrapper">
        <div className="map" ref={mapRef}>
          {map && (
            <VectorLayerComponent map={map} updatePlacemark={updatePlacemark} />
          )}
        </div>
      </div>
    </FadeInDiv>
  )
}

OpenlayersMap.propTypes = {
  postForm: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  validationErrors: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  loading: state.async.loading,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, {
  updatePostFormAttributes,
  updateAddressSuggestions
})(OpenlayersMap)
