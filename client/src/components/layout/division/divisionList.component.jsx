import React from 'react'
import DivisionItem from './divisionItem.component'

const DivisionList = ({
  items,
  onDivisionSelect,
  localities,
  cities = false
}) => {
  return (
    <ul className={`${cities ? 'city-list' : 'division-list'}`}>
      {items &&
        items.map((item, index) => (
          <li key={index} className="division-item">
            <DivisionItem
              item={item}
              localities={localities}
              primary={cities}
              onDivisionSelect={onDivisionSelect}
            />
          </li>
        ))}
    </ul>
  )
}

export default DivisionList
