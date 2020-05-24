import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './sideCard.style.scss'

const SideCard = ({ post: { price, sqm, userName, userType, contact } }) => {
  const [showPhone, setShowPhone] = useState(false)

  const handleOnClick = () => setShowPhone(!showPhone)

  const formattedPrice = price.toLocaleString('az-AZ', {
    style: 'decimal',
  })

  const priceForSqm = Math.round((price / sqm + Number.EPSILON) * 100) / 100

  const userIcon = userType === 'agent' ? 'user-tie' : 'user'

  const [t] = useTranslation()

  return (
    <div>
      <div className="side-card light-border">
        <div className="price-wrapper">
          <span className="price">{formattedPrice} AZN</span>
          <span>{t('post.price.priceForSqm', { priceForSqm })}</span>
        </div>
        <div className="user-info">
          <i className={`fas fa-${userIcon} fa-2x`}></i>
          <div className="user-name-and-type">
            <span className="user-name">{userName}</span>
            <span className="text-secondary">
              {t(`post.price.userType.${userType}`)}
            </span>
          </div>
        </div>
        {showPhone ? (
          <Fragment>
            <span className="phone-number">{contact}</span>
            <span className="text-secondary text-sm">
              {t('post.price.message')}
            </span>
          </Fragment>
        ) : (
          <div>
            <button className="btn btn-primary" onClick={handleOnClick}>
              {t('post.price.showNumber')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

SideCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default SideCard
