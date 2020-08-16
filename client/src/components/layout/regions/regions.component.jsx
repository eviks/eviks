import React, { Fragment, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getRegions, clearRegions } from '../../../actions/region'
import { updatePostFormAttributes } from '../../../actions/post'
import Region from './region.component'
import Spinner from '../spinner/spinner.component'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

import './regions.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const Regions = ({
  loading,
  regions,
  getRegions,
  clearRegions,
  updatePostFormAttributes,
  handleCloseModal
}) => {
  const containerRef = useRef(null)

  const [selectedRegion, setSelectedRegion] = useState({
    city: { name: '', id: '', location: [0, 0] },
    district: { name: '', id: '', location: [0, 0] },
    subdistrict: { name: '', id: '', location: [0, 0] }
  })

  const { city, district, subdistrict } = selectedRegion

  useEffect(() => {
    getRegions({ Type: 2 })
    return () => clearRegions()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (regions.length === 1) {
      setSelectedRegion({
        ...selectedRegion,
        [getTypeName(regions[0])]: {
          name: regions[0].Name,
          id: regions[0].ID,
          location: [regions[0].X, regions[0].Y]
        }
      })
    }
    // eslint-disable-next-line
  }, [regions])

  // Disable body scroll
  useEffect(() => {
    let currentRef
    if (containerRef) currentRef = containerRef.current
    if (currentRef) {
      disableBodyScroll(currentRef)
    }
    return () => enableBodyScroll(currentRef)
  })

  const getTypeName = region => {
    if (region.Type === '2') return 'city'
    if (
      region.Type === '8' ||
      (region.Type === '32' && selectedRegion.district.id === '')
    )
      return 'district'
    return 'subdistrict'
  }

  const getTitle = () => {
    if (subdistrict.id !== '') return subdistrict.name
    if (district.id !== '') return district.name
    if (city.id !== '') return city.name
  }

  const selectRegion = () => {
    updatePostFormAttributes({
      city,
      district,
      subdistrict,
      location: [0, 0]
    })
    handleCloseModal()
  }

  return (
    <FadeInDiv className="regions-container" ref={containerRef}>
      {loading ? (
        <Spinner className="regions-loading-spinner" />
      ) : (
        <Fragment>
          {city.id !== '' && (
            <div className="regions-header">
              <h1>{getTitle()}</h1>
              <button className="btn btn-primary btn-md" onClick={selectRegion}>
                Выбрать
              </button>
            </div>
          )}
          <ul className={'regions-list'}>
            {regions &&
              regions.map(region =>
                city.id !== '' ? (
                  region.children &&
                  region.children.map(region => (
                    <li key={region.ID} className="regions-item">
                      <Region region={region} />
                    </li>
                  ))
                ) : (
                  <li key={region.ID} className="regions-item">
                    <Region region={region} />
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

Regions.propTypes = {
  loading: PropTypes.bool.isRequired,
  regions: PropTypes.array.isRequired,
  getRegions: PropTypes.func.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
  clearRegions: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loading: state.async.loading,
  regions: state.region.regions
})

export default connect(mapStateToProps, {
  getRegions,
  clearRegions,
  updatePostFormAttributes
})(Regions)
