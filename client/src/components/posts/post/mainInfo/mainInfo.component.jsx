import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './mainInfo.style.scss'

const MainInfo = ({
  post: {
    estateType,
    rooms,
    sqm,
    livingRoomsSqm,
    kitchenSqm,
    lotSqm,
    floor,
    totalFloors,
  },
}) => {
  const [t] = useTranslation()

  return (
    <Fragment>
      <div className="main-info py-1">
        <div>
          <span className="lead lead-bold">{rooms}</span>
          <span>{t('post.info.rooms')}</span>
        </div>
        <div>
          <span className="lead lead-bold">{sqm} м²</span>
          <span>{t('post.info.sqm')}</span>
        </div>
        {livingRoomsSqm != null && livingRoomsSqm !== 0 && (
          <div>
            <span className="lead lead-bold">{livingRoomsSqm} м²</span>
            <span>{t('post.info.livingSqm')}</span>
          </div>
        )}
        {kitchenSqm != null && kitchenSqm !== 0 && (
          <div>
            <span className="lead lead-bold">{kitchenSqm} м²</span>
            <span>{t('post.info.kitchenSqm')}</span>
          </div>
        )}
        {estateType === 'apartment' ? (
          <div>
            <span className="lead lead-bold">
              {t('post.info.floor', { floor, totalFloors })}
            </span>
            <span>{t('post.info.floorTitle')}</span>
          </div>
        ) : (
          <div>
            <span className="lead lead-bold">{lotSqm} м²</span>
            <span>{t('post.info.lot')}</span>
          </div>
        )}
      </div>
      <div className="divider" />
    </Fragment>
  )
}

MainInfo.propTypes = {
  post: PropTypes.object.isRequired,
}

export default MainInfo
