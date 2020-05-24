import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './buildingInfo.style.scss'

const BuildingInfo = ({
  post: { estateType, ceilingHeight, yearBuild, elevator, parkingLot },
}) => {
  const [t] = useTranslation()
  return (
    <div className="my-1">
      <h2>{t('post.building.title')}</h2>
      <div className="building-info-wrapper">
        {ceilingHeight != null && ceilingHeight !== 0 && (
          <div className="building-info">
            {t('post.building.ceilingHeight', { ceilingHeight })}
          </div>
        )}
        {yearBuild != null && yearBuild !== 0 && (
          <div className="building-info">
            {t('post.building.yearBuild', { yearBuild })}
          </div>
        )}
        {estateType === 'apartment' && (
          <Fragment>
            {elevator != null && elevator !== 0 && (
              <div className="building-info">{t('post.building.elevator')}</div>
            )}
            {parkingLot != null && parkingLot !== 0 && (
              <div className="building-info">
                {t('post.building.parkingLot')}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

BuildingInfo.propTypes = {
  post: PropTypes.object.isRequired,
}

export default BuildingInfo
