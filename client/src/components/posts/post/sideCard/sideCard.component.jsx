import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SvgUser, SvgAgent } from '../../../layout/icons'
import PropTypes from 'prop-types'

import './sideCard.style.scss'

const SideCard = ({ post: { price, sqm, username, userType, contact } }) => {
  const [showPhone, setShowPhone] = useState(false)

  const handleOnClick = () => setShowPhone(!showPhone)

  const formattedPrice = price.toLocaleString('az-AZ', {
    style: 'decimal',
  })

  const priceForSqm = Math.round((price / sqm + Number.EPSILON) * 100) / 100

  const [t] = useTranslation()

  return (
    <div className="side-card-container">
      <div className="side-card light-shadow-border">
        <div className="mb-1">
          <h2 className="price large">{formattedPrice} ₼</h2>
          <span>{t('post.price.priceForSqm', { priceForSqm })}</span>
        </div>
        <div className="card-user-info">
          {userType === 'agent' ? (
            <SvgAgent width={'2em'} height={'2em'} />
          ) : (
            <SvgUser width={'2em'} height={'2em'} />
          )}
          <div className="user-name-and-type">
            <span className="user-name">{username}</span>
            <span className="text-secondary">
              {t(`post.price.userType.${userType}`)}
            </span>
          </div>
        </div>
        {showPhone ? (
          <Fragment>
            <span className="lead">{contact}</span>
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
