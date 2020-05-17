import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './buildingInfo.style.scss'

const BuildingInfo = ({
  post: { estateType, ceilingHeight, yearBuild, elevator, parkingLot }
}) => {
  return (
    <div className="my-1">
      <h2>О доме</h2>
      <div className="building-info-wrapper">
        {ceilingHeight != null && ceilingHeight !== 0 && (
          <div className="building-info">{`Высота потолка: ${ceilingHeight} метра`}</div>
        )}
        {yearBuild != null && yearBuild !== 0 && (
          <div className="building-info">{`Год постройки: ${yearBuild} г.`}</div>
        )}
        {estateType === 'apartment' && (
          <Fragment>
            {elevator != null && elevator !== 0 && (
              <div className="building-info">{'Есть лифт'}</div>
            )}
            {parkingLot != null && parkingLot !== 0 && (
              <div className="building-info">{'Есть парковка'}</div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

BuildingInfo.propTypes = {
  post: PropTypes.object.isRequired
}

export default BuildingInfo
