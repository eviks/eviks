/*global google*/
import React from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
import PlaceInput from '../../../layout/form/placeInput/placeInput.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { googleAPIKey } from '../../../../config'
import { useTranslation } from 'react-i18next'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const geocoder = new google.maps.Geocoder()

const Marker = () => (
  <div>
    <i
      className="fas fa-dot-circle fa-2x"
      style={{
        color: '#ed4751',
        position: 'absolute',
        width: 40,
        height: 40,
        left: -40 / 2,
        top: -40 / 2
      }}
    ></i>
  </div>
)

const PostMap = ({ address, lat, lng, updatePostFormAttributes }) => {
  const [t] = useTranslation()

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

  const onChange = (city, district, address, lat, lng) => {
    if (lat === null || lng === null) {
      updatePostFormAttributes({ city, district, address })
    } else {
      updatePostFormAttributes({ city, district, address, lat, lng })
    }
  }

  const onClickMap = obj => {
    let latlng = new google.maps.LatLng(obj.lat, obj.lng)
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          console.log(results)
          const { address_components, formatted_address } = results[0]
          updatePostFormAttributes({
            city: address_components[address_components.length - 2].long_name,
            district: address_components[1].long_name,
            address: formatted_address,
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
      <h3 className="step-title my-1">{t('createPost.mapInfo.title')}</h3>
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
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </FadeInDiv>
  )
}

PostMap.propTypes = {
  address: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  address: state.post.postForm.address,
  lat: state.post.postForm.lat,
  lng: state.post.postForm.lng
})

export default connect(mapStateToProps, { updatePostFormAttributes })(PostMap)
