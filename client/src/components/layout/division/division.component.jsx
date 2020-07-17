import React, { Fragment, useState, useEffect, useRef } from 'react'
import DivisionList from './divisionList.component'
import DivisionLevel from './divisionLevel.component'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../actions/post'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import divisions from '../../../utils/divisions/divisions'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

import './division.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const Division = ({
  handleCloseModal,
  changeMapCenter,
  updatePostFormAttributes
}) => {
  const { countryCities, autonomousRepublic, countryDistricts } = divisions
  const allCities = [
    ...countryCities,
    ...autonomousRepublic[0].cities,
    ...autonomousRepublic[0].districts,
    ...countryDistricts
  ]

  const containerRef = useRef(null)

  const [divisionItems, setDivisionItems] = useState([])

  const [state, setState] = useState({
    city: null,
    district: null,
    subdistrict: null,
    location: []
  })
  const { city, district, subdistrict, location } = state

  // Update division list
  useEffect(() => {
    let divisionItems
    if (subdistrict) {
      divisionItems = []
    } else if (district) {
      divisionItems = district.subdistricts || []
    } else if (city) {
      divisionItems = city.districts || []
    } else {
      divisionItems = allCities
    }
    setDivisionItems(divisionItems)
    // eslint-disable-next-line
  }, [city, district, subdistrict])

  // Disable body scroll
  useEffect(() => {
    let currentRef
    if (containerRef) currentRef = containerRef.current
    if (currentRef) {
      disableBodyScroll(currentRef)
    }
    return () => enableBodyScroll(currentRef)
  })

  const selectDivision = () => {
    updatePostFormAttributes({
      city: city ? city.name : '',
      district: district ? district.name : '',
      subdistrict: subdistrict ? subdistrict.name : '',
      location: { lat: '', lng: '' }
    })
    handleCloseModal()
    changeMapCenter([location[1], location[0]])
  }

  const getTitle = () => {
    if (subdistrict) return subdistrict.name
    if (district) return district.name
    if (city) return city.name
  }

  return (
    <FadeInDiv className="divisions-container" ref={containerRef}>
      <Fragment>
        <DivisionLevel divisionState={state} updateDivisionState={setState} />
        {!city ? (
          <Fragment>
            {/* Country cities */}
            <h1 className="text-secondary">Города</h1>
            <DivisionList
              items={countryCities}
              cities={true}
              divisionState={state}
              updateDivisionState={setState}
            />
            {/* Country districts */}
            <h1 className="text-secondary">Районы</h1>
            <DivisionList
              items={countryDistricts}
              divisionState={state}
              updateDivisionState={setState}
            />
            {/* Autonomous Republic */}
            <h1 className="text-secondary mt-1">
              {autonomousRepublic[0].name}
            </h1>
            <DivisionList
              items={autonomousRepublic[0].cities}
              cities={true}
              divisionState={state}
              updateDivisionState={setState}
            />
            <div className="mt-1">
              <DivisionList
                items={autonomousRepublic[0].districts}
                divisionState={state}
                updateDivisionState={setState}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="division-header">
              <h1>{getTitle()}</h1>
              {divisionItems.length === 0 && (
                <button
                  className="btn btn-primary btn-md"
                  onClick={selectDivision}
                >
                  Выбрать
                </button>
              )}
            </div>
            <DivisionList
              items={divisionItems}
              divisionState={state}
              updateDivisionState={setState}
            />
          </Fragment>
        )}
      </Fragment>
      <button className="close-modal" onClick={handleCloseModal}>
        <i className="fas fa-times"></i>
      </button>
    </FadeInDiv>
  )
}

Division.propTypes = {
  updatePostFormAttributes: PropTypes.func.isRequired,
  changeMapCenter: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}

export default connect(null, { updatePostFormAttributes })(Division)

/* Country cities */
/* <div>

</div> */
