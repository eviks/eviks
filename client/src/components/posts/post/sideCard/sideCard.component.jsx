import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import './sideCard.style.scss'

const SideCard = ({ post: { price, sqm, userName, userType, contact } }) => {
  const [showPhone, setShowPhone] = useState(false)

  const handleOnClick = () => setShowPhone(!showPhone)

  const formattedPrice = price.toLocaleString('az-AZ', {
    style: 'decimal'
  })

  const priceForSqm = Math.round((price / sqm + Number.EPSILON) * 100) / 100

  const formattedUserType = userType === 'agent' ? 'Агент' : 'Владелец'
  const userIcon = userType === 'agent' ? 'user-tie' : 'user'

  return (
    <div>
      <div className="side-card light-border">
        <div className="price-wrapper">
          <span className="price">{formattedPrice} AZN</span>
          <span>{priceForSqm} AZN за м²</span>
        </div>
        <div className="user-info">
          <i className={`fas fa-${userIcon} fa-2x`}></i>
          <div className="user-name-and-type">
            <span className="user-name">{userName}</span>
            <span className="text-secondary">{formattedUserType}</span>
          </div>
        </div>
        {showPhone ? (
          <Fragment>
            <span className="phone-number">{contact}</span>
            <span className="text-secondary text-sm">
              Не забудьте сообщить о том, что нашли это объявление на Eviks
            </span>
          </Fragment>
        ) : (
          <div>
            <button className="btn btn-primary" onClick={handleOnClick}>
              Показать номер
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

SideCard.propTypes = {
  post: PropTypes.object.isRequired
}

export default SideCard
