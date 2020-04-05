import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './postItem.styles.scss'

const PostItem = ({
  post: {
    city,
    district,
    sqm,
    rooms,
    floor,
    totalFloors,
    price,
    date,
    _id,
    photos,
  },
}) => {
  const [t] = useTranslation()

  const priceStr = price.toLocaleString('az-AZ', {
    style: 'decimal',
  })
  return (
    <Link className="card" to={`/posts/${_id}`}>
      <div className="card-images">
        {photos.length > 0 && <img src={photos[0].thumb} alt="Card" />}
      </div>
      <div className="card-info">
        <div className="card-price">{`${priceStr} AZN`}</div>
        <div className="card-main-params">
          {sqm} m2 | {rooms} {t('postList.room')} | {floor}/{totalFloors}
        </div>
        <div className="card-area">{district}</div>
        <div className="card-city-and-date">
          {city} <Moment format="DD.MM.YY">{date}</Moment>
        </div>
        <div className="card-specials">
          <i className="fas fa-crown"></i>
        </div>
      </div>
    </Link>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostItem
