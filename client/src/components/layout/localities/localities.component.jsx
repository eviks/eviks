import React, { Fragment, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getLocalities, clearLocalities } from '../../../actions/locality'
import { updatePostFormAttributes } from '../../../actions/post'
import Locality from './locality.component'
import Spinner from '../spinner/spinner.component'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

import './localities.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const Localities = ({
  loading,
  localities,
  getLocalities,
  citySelectMode = false,
  clearLocalities,
  updatePostFormAttributes,
  handleCloseModal
}) => {
  const containerRef = useRef(null)

  const [selectedLocality, setSelectedLocality] = useState({
    city: { name: '', id: '', location: [0, 0] },
    district: { name: '', id: '', location: [0, 0] },
    subdistrict: { name: '', id: '', location: [0, 0] }
  })

  const { city, district, subdistrict } = selectedLocality

  useEffect(() => {
    getLocalities({ type: 2 })
    return () => clearLocalities()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (localities.length === 1) {
      setSelectedLocality({
        ...selectedLocality,
        [getTypeName(localities[0])]: {
          name: localities[0].name,
          id: localities[0].id,
          location: [localities[0].x, localities[0].y]
        }
      })
    }
    // eslint-disable-next-line
  }, [localities])

  // Disable body scroll
  useEffect(() => {
    let currentRef
    if (containerRef) currentRef = containerRef.current
    if (currentRef) {
      disableBodyScroll(currentRef)
    }
    return () => enableBodyScroll(currentRef)
  })

  const getTypeName = locality => {
    if (locality.type === '2') return 'city'
    if (
      locality.type === '8' ||
      (locality.type === '32' && selectedLocality.district.id === '')
    )
      return 'district'
    return 'subdistrict'
  }

  const getTitle = () => {
    if (subdistrict.id !== '') return subdistrict.name
    if (district.id !== '') return district.name
    if (city.id !== '') return city.name
  }

  const getSearchArea = () => {
    if (subdistrict.id !== '') return subdistrict.location
    if (district.id !== '') return district.location
    if (city.id !== '') return city.location
  }

  const selectLocality = () => {
    updatePostFormAttributes({
      city: city.name,
      district: district.name,
      subdistrict: subdistrict.name,
      address: '',
      searchArea: getSearchArea(),
      location: [0, 0]
    })
    handleCloseModal()
  }

  return (
    <FadeInDiv className="localities-container" ref={containerRef}>
      {loading ? (
        <Spinner className="localities-loading-spinner" />
      ) : (
        <Fragment>
          {city.id !== '' && (
            <div className="localities-header">
              <h1>{getTitle()}</h1>
              <button className="btn btn-primary btn-md" onClick={selectLocality}>
                Выбрать
              </button>
            </div>
          )}
          <ul className={'localities-list'}>
            {localities &&
              localities.map(locality =>
                city.id !== '' ? (
                  locality.children &&
                  locality.children.map(locality => (
                    <li key={locality.id} className="localities-item">
                      <Locality
                        locality={locality}
                        citySelectMode={citySelectMode}
                        handleCloseModal={handleCloseModal}
                      />
                    </li>
                  ))
                ) : (
                  <li key={locality.id} className="localities-item">
                    <Locality
                      locality={locality}
                      citySelectMode={citySelectMode}
                      handleCloseModal={handleCloseModal}
                    />
                  </li>
                )
              )}
          </ul>
        </Fragment>
      )}
      <button className="close-modal" onClick={handleCloseModal}>
        <i className="fas fa-times"></i>
      </button>
    </FadeInDiv>
  )
}

Localities.propTypes = {
  loading: PropTypes.bool.isRequired,
  localities: PropTypes.array.isRequired,
  getLocalities: PropTypes.func.isRequired,
  citySelectMode: PropTypes.bool,
  updatePostFormAttributes: PropTypes.func.isRequired,
  clearLocalities: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loading: state.async.loading,
  localities: state.locality.localities
})

export default connect(mapStateToProps, {
  getLocalities,
  clearLocalities,
  updatePostFormAttributes
})(Localities)
