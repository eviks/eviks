import React, { Fragment, useState, useEffect, useRef } from 'react'
import SearchDivision from './searchDivision.component'
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
// Create list of all localities
const { countryCities, autonomousRepublic, countryDistricts } = divisions
const allCities = [
  ...countryCities,
  ...autonomousRepublic[0].cities,
  ...autonomousRepublic[0].districts,
  ...countryDistricts
]
let allDistricts = []
allCities.forEach(city => {
  if (city.districts) allDistricts = [...allDistricts, ...city.districts]
})

let allSubdistricts = []
allDistricts.forEach(district => {
  if (district.subdistricts)
    allSubdistricts = [...allSubdistricts, ...district.subdistricts]
})

const localities = [...allCities, ...allDistricts, ...allSubdistricts]

const Division = ({ handleCloseModal, updatePostFormAttributes }) => {
  const containerRef = useRef(null)

  const [divisionItems, setDivisionItems] = useState([])

  const [state, setState] = useState({
    city: null,
    district: null,
    subdistrict: null,
    location: []
  })
  const { city, district, subdistrict, location } = state

  const findParentElement = item => {
    if (item.type === 'subdistrict')
      return allDistricts.filter(district => {
        let elements = district.subdistricts
          ? district.subdistricts.filter(
              subdistrict => subdistrict.name === item.name
            )
          : []
        return elements.length === 1
      })[0]

    if (item.type === 'district')
      return allCities.filter(city => {
        let elements = city.districts
          ? city.districts.filter(district => district.name === item.name)
          : []
        return elements.length === 1
      })[0]
  }

  // Select division
  const onDivisionSelect = item => {
    const { type } = item

    let newState

    if (type === 'city')
      newState = {
        city: item,
        district: null,
        subdistrict: null,
        location: item.location
      }
    if (type === 'district')
      newState = {
        city: findParentElement(item),
        district: item,
        subdistrict: null,
        location: item.location
      }
    if (type === 'subdistrict') {
      const itemDistrict = findParentElement(item)
      newState = {
        city: findParentElement(itemDistrict),
        district: itemDistrict,
        subdistrict: item,
        location: item.location
      }
    }
    if (type === 'country')
      newState = {
        city: null,
        district: null,
        subdistrict: null,
        location: []
      }

    setState(newState)
  }

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
      location: [0, 0],
      cityLocation: [location[1], location[0]]
    })
    handleCloseModal()
  }

  const getTitle = () => {
    if (subdistrict) return subdistrict.name
    if (district) return district.name
    if (city) return city.name
  }

  return (
    <FadeInDiv className="divisions-container" ref={containerRef}>
      <Fragment>
        <SearchDivision
          onDivisionSelect={onDivisionSelect}
          localities={localities}
        />
        <DivisionLevel
          divisionState={state}
          localities={localities}
          onDivisionSelect={onDivisionSelect}
        />
        {!city ? (
          <Fragment>
            {/* Country cities */}
            <h1 className="text-secondary">Города</h1>
            <DivisionList
              items={countryCities}
              cities={true}
              onDivisionSelect={onDivisionSelect}
            />
            {/* Country districts */}
            <h1 className="text-secondary">Районы</h1>
            <DivisionList
              items={countryDistricts}
              onDivisionSelect={onDivisionSelect}
            />
            {/* Autonomous Republic */}
            <h1 className="text-secondary mt-1">
              {autonomousRepublic[0].name}
            </h1>
            <DivisionList
              items={autonomousRepublic[0].cities}
              cities={true}
              onDivisionSelect={onDivisionSelect}
            />
            <div className="mt-1">
              <DivisionList
                items={autonomousRepublic[0].districts}
                onDivisionSelect={onDivisionSelect}
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
              localities={localities}
              onDivisionSelect={onDivisionSelect}
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
  handleCloseModal: PropTypes.func.isRequired
}

export default connect(null, { updatePostFormAttributes })(Division)
