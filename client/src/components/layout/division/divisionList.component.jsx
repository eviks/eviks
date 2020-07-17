import React from 'react'
import DivisionItem from './divisionItem.component'

const DivisionList = ({
  items,
  divisionState,
  updateDivisionState,
  cities = false
}) => {
  return (
    <ul className={`${cities ? 'city-list' : 'division-list'}`}>
      {items &&
        items.map((item, index) => (
          <li key={index} className="division-item">
            <DivisionItem
              item={item}
              primary={cities}
              divisionState={divisionState}
              updateDivisionState={updateDivisionState}
            />
          </li>
        ))}
    </ul>
  )
}

export default DivisionList
