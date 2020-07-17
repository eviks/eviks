import React from 'react'
import DivisionItem from './divisionItem.component'
import PropTypes from 'prop-types'

const DivisionLevel = ({ divisionState, updateDivisionState }) => {
  const { city, district, subdistrict } = divisionState
  const levels = [{ name: 'Азербайджан', type: 'country', location: [] }]
  if (city) levels.push(city)
  if (district) levels.push(district)
  if (subdistrict) levels.push(subdistrict)
  return (
    <div className="text-secondary">
      {levels.map(
        (level, index) =>
          level &&
          index !== levels.length - 1 && (
            <DivisionItem
              key={index}
              item={level}
              className="division-level text-secondary"
              divisionState={divisionState}
              updateDivisionState={updateDivisionState}
            />
          )
      )}
    </div>
  )
}

DivisionLevel.propTypes = {
  divisionState: PropTypes.object.isRequired,
  updateDivisionState: PropTypes.func.isRequired
}

export default DivisionLevel
