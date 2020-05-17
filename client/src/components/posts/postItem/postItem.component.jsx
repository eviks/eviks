import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './postItem.style.scss'

const PostItem = ({
  post: {
    estateType,
    city,
    district,
    sqm,
    lotSqm,
    rooms,
    floor,
    totalFloors,
    price,
    date,
    _id,
    photos,
    documented,
    mortgage
  }
}) => {
  const [t] = useTranslation()

  const priceStr = price.toLocaleString('az-AZ', {
    style: 'decimal'
  })
  return (
    <Link className="card light-border" to={`/posts/${_id}`}>
      <div className="card-photos">
        {photos.length > 0 && (
          <picture>
            <img className="photo-element" src={photos[0].thumb} alt="Card" />
          </picture>
        )}
      </div>
      <div className="card-info">
        <div className="card-block">
          <div>
            <div className="lead-2x lead-bold">{`${priceStr} AZN`}</div>
            <div className="lead-2x">{district}</div>
          </div>
          <div className="card-main-params">
            {sqm} m² | {rooms} {t('postList.room')} |{' '}
            {estateType === 'apartment'
              ? `${floor}/${totalFloors}`
              : `${lotSqm} m²`}
          </div>
        </div>
        <div className="card-block card-bottom">
          <div className="time-stamp">
            {city} <Moment format="DD.MM.YY">{date}</Moment>
          </div>
          <div className="card-features">
            {documented && (
              <div className="card-feature">
                <i className="fas fa-stamp"></i>
              </div>
            )}
            {mortgage && (
              <div className="card-feature">
                <i className="fas fa-coins"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostItem
