import React from 'react'
import PropTypes from 'prop-types'

const DivisionItem = ({
  item,
  primary = false,
  className = '',
  divisionState,
  updateDivisionState
}) => {
  const { name, location, type } = item

  const onClick = () => {
    let newDivisionState

    if (type === 'city')
      newDivisionState = {
        city: item,
        district: null,
        subdistrict: null,
        location: location
      }
    if (type === 'district')
      newDivisionState = {
        ...divisionState,
        district: item,
        subdistrict: null,
        location: location
      }
    if (type === 'subdistrict')
      newDivisionState = {
        ...divisionState,
        subdistrict: item,
        location: location
      }

    if (type === 'country')
      newDivisionState = {
        city: null,
        district: null,
        subdistrict: null,
        location: []
      }

    updateDivisionState(newDivisionState)
  }

  return (
    <button
      className={`${className} ${primary ? 'btn btn-ghost-pm btn-md' : 'link'}`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

DivisionItem.propTypes = {
  item: PropTypes.object.isRequired,
  primary: PropTypes.bool,
  className: PropTypes.string,
  divisionState: PropTypes.object.isRequired,
  updateDivisionState: PropTypes.func.isRequired
}

export default DivisionItem
