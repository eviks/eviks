import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './postItem.styles.scss'

const PostItem = ({
  post: {
    priceInfo: { price },
    estate: { sqm, rooms, floor, totalFloors },
    generalInfo: { city, district },
    date
  }
}) => {
  const [t] = useTranslation()

  const priceStr = price.toLocaleString('az-AZ', {
    style: 'decimal'
  })
  return (
    <Link class="card" to="/posts/:id">
      <div class="card-images">
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1873&q=80"
          alt="Card"
        />
      </div>
      <div class="card-info">
        <div class="card-price">{`${priceStr} AZN`}</div>
        <div class="card-main-params">
          {sqm} m2 | {rooms} {t('room')} | {floor}/{totalFloors}
        </div>
        <div class="card-area">{district}</div>
        <div class="card-city-and-date">
          {city} <Moment format="DD.MM.YY">{date}</Moment>
        </div>
        <div class="card-specials">
          <i class="fas fa-crown"></i>
        </div>
      </div>
    </Link>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostItem
