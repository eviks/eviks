import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
import {
  Map,
  Placemark,
  FullscreenControl,
  ZoomControl,
  TypeSelector,
  GeolocationControl
} from 'react-yandex-maps'
import Input from '../../../layout/form/input/input.component'
import AddressDropdown from './addressDropdown.component'
import axios from 'axios'
import { yandexAPIKey } from '../../../../config'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostMap = ({
  postForm: {
    address,
    location: { lat, lng }
  },
  updatePostFormAttributes,
  validationErrors
}) => {
  // ymaps ref
  const [map, setMap] = useState(null)

  const [mapData, setMapData] = useState({
    center: lat && lng ? [lat, lng] : ['40.409264', '49.867092'],
    zoom: lat && lng ? 18 : 11,
    controls: []
  })

  const [dropdownList, setDropdownList] = useState([])

  // Address input ref
  let inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.inputElement.value = address
  }, [address])

  // Timer for typing delay
  let timerRef = useRef(null)

  const onMapClick = event => {
    updatePlacemark(event.get('coords'))
  }

  const updatePlacemark = coords => {
    updatePostFormAttributes({
      location: { lat: coords[0], lng: coords[1] }
    })
    getAddress(coords)
    setDropdownList([])
  }

  const getAddress = async coords => {
    try {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${yandexAPIKey}&geocode=${coords[0]},${coords[1]}&results=1&sco=latlong&format=json&lang=az_AZ`
      )
      const featureMember = res.data.response.GeoObjectCollection.featureMember
      if (featureMember.length > 0) {
        console.log(featureMember)

        const GeocoderMetaData =
          featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData

        const newAttributes = {
          country: '',
          city: '',
          street: '',
          houseNumber: '',
          address: GeocoderMetaData.text.replace('Azərbaycan, ', '')
        }

        GeocoderMetaData.Address.Components.forEach(component => {
          if (component.kind === 'country')
            newAttributes.country = component.name
          if (component.kind === 'area') newAttributes.city = component.name
          if (component.kind === 'street') newAttributes.street = component.name
          if (component.kind === 'house')
            newAttributes.houseNumber = component.name
        })

        updatePostFormAttributes(newAttributes)
      }

      // Zoom to placemark
      setMapData({ ...mapData, zoom: 18 })

      // Smoothly moving to the center
      map.panTo([coords], {
        delay: 1500
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleInputChange = event => {
    event.persist()

    updatePostFormAttributes({ address: event.target.value })

    const duration = 2000
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      updateDropdownList(event.target.value)
    }, duration)
  }

  const updateDropdownList = async text => {
    try {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${yandexAPIKey}&geocode=${text}&bbox=44.46,38.24~50.33,41.54&kind=house&results=5&sco=latlong&format=json&lang=az_AZ`
      )

      const list = []
      const featureMember = res.data.response.GeoObjectCollection.featureMember

      featureMember.forEach(member => {
        if (
          member.GeoObject.metaDataProperty.GeocoderMetaData.Address
            .country_code === 'AZ'
        )
          list.push({
            text: member.GeoObject.metaDataProperty.GeocoderMetaData.text.replace(
              'Azərbaycan, ',
              ''
            ),
            location: member.GeoObject.Point.pos.split(' ')
          })
      })
      setDropdownList(list)
    } catch (error) {
      console.log(error.message)
    }
  }

  const [t] = useTranslation()

  return (
    <FadeInDiv className="step-map">
      <h3 className="step-title my-1">{t('createPost.mapInfo.title')}</h3>
      <Input
        mask={false}
        options={{
          type: 'text',
          name: 'address',
          placeholder: t('form.googleAutoComplitePlaceholder'),
          style: { width: '100%' },
          ref: inputRef
        }}
        onChange={e => handleInputChange(e)}
        error={validationErrors.address}
      />
      <AddressDropdown list={dropdownList} updatePlacemark={updatePlacemark} />
      <div className="map-wrapper">
        <Map
          className="map"
          state={mapData}
          onClick={onMapClick}
          instanceRef={ref => setMap(ref)}
        >
          {lat !== 0 && lng !== 0 && <Placemark geometry={[lat, lng]} />}
          <FullscreenControl />
          <ZoomControl />
          <TypeSelector />
          <GeolocationControl />
        </Map>
      </div>
    </FadeInDiv>
  )
}

PostMap.propTypes = {
  postForm: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, { updatePostFormAttributes })(PostMap)
