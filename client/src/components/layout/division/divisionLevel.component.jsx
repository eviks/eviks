import React from 'react'
import DivisionItem from './divisionItem.component'
import PropTypes from 'prop-types'

const DivisionLevel = ({ onDivisionSelect, divisionState, localities }) => {
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
              localities={localities}
              className="division-level text-secondary"
              onDivisionSelect={onDivisionSelect}
            />
          )
      )}
    </div>
  )
}

DivisionLevel.propTypes = {
  divisionState: PropTypes.object.isRequired,
  onDivisionSelect: PropTypes.func.isRequired,
  localities: PropTypes.array.isRequired
}

export default DivisionLevel
