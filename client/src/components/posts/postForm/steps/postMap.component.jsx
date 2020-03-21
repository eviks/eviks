/*global google*/
import React from 'react'
import PlaceInput from '../../../layout/form/placeInput/placeInput.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { googleAPIKey } from '../../../../config'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const geocoder = new google.maps.Geocoder()

const AnyReactComponent = () => (
  <div>
    <i className="fas fa-map-marker-alt fa-3x" style={{ color: '#fe4060' }}></i>
  </div>
)

const PostMap = ({ formData, setFormData }) => {
  const { address, lat, lng } = formData

  const options = {
    name: 'address',
    value: address,
    searchOptions: {
      location: new google.maps.LatLng({
        lat: 40.40926169999999,
        lng: 49.8670924
      }),
      radius: 1000,
      types: ['address'],
      componentRestrictions: { country: 'az' }
    }
  }

  const onChange = (address, lat, lng) => {
    console.log('123')
    if (lat === null || lng === null) {
      setFormData({ ...formData, address })
    } else {
      setFormData({ ...formData, address, lat, lng })
    }
  }

  const onClickMap = obj => {
    let latlng = new google.maps.LatLng(obj.lat, obj.lng)
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          setFormData({
            ...formData,
            address: results[1].formatted_address,
            lat: obj.lat,
            lng: obj.lng
          })
        } else {
          console.log('No results found')
        }
      } else {
        console.log('Geocoder failed due to: ' + status)
      }
    })
  }

  return (
    <FadeInDiv>
      <h3 className="my-1">Show your house on the map</h3>
      <PlaceInput options={options} onChange={onChange} />
      <div
        style={{
          height: '55vh',
          width: '100%',
          marginBottom: '1rem'
        }}
      >
        <GoogleMapReact
          onClick={onClickMap}
          bootstrapURLKeys={{ key: googleAPIKey }}
          defaultCenter={{
            lat,
            lng
          }}
          center={{ lat, lng }}
          defaultZoom={11}
        >
          <AnyReactComponent lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </FadeInDiv>
  )
}

PostMap.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired
}

export default PostMap
