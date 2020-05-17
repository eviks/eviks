import React from 'react'
import PropTypes from 'prop-types'

const MainInfo = ({
  post: {
    estateType,
    rooms,
    sqm,
    livingRoomsSqm,
    kitchenSqm,
    lotSqm,
    floor,
    totalFloors
  }
}) => {
  return (
    <div className="main-info py-1">
      <div>
        <span className="lead lead-bold">{rooms}</span>
        <span>Комнаты</span>
      </div>
      <div>
        <span className="lead lead-bold">{sqm} м²</span>
        <span>Общая площадь</span>
      </div>
      {livingRoomsSqm != null && livingRoomsSqm !== 0 && (
        <div>
          <span className="lead lead-bold">{livingRoomsSqm} м²</span>
          <span>Жилая площадь</span>
        </div>
      )}
      {kitchenSqm != null && kitchenSqm !== 0 && (
        <div>
          <span className="lead lead-bold">{kitchenSqm} м²</span>
          <span>Кухня</span>
        </div>
      )}
      {estateType === 'apartment' ? (
        <div>
          <span className="lead lead-bold">
            {floor} из {totalFloors}
          </span>
          <span>Этаж</span>
        </div>
      ) : (
        <div>
          <span className="lead lead-bold">{lotSqm} м²</span>
          <span>Участок</span>
        </div>
      )}
    </div>
  )
}

MainInfo.propTypes = {
  post: PropTypes.object.isRequired
}

export default MainInfo
