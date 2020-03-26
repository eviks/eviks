import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import PropTypes from 'prop-types'

import './postItem.styles.scss'

const PostItem = ({
  post: { city, district, sqm, rooms, floor, totalFloors, price, date, _id }
}) => {
  const [itemPhotos, setItemPhotos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/posts/photo/${_id}`)
      setItemPhotos([...res.data])
    }

    fetchData()
  }, [setItemPhotos])

  const [t] = useTranslation()

  const priceStr = price.toLocaleString('az-AZ', {
    style: 'decimal'
  })
  return (
    <Link className="card" to={`/posts/${_id}`}>
      <div className="card-images">
        {itemPhotos.length > 0 && (
          <img
            src={`/api/posts/photo/single/${itemPhotos[0].filename}`}
            alt="Card"
          />
        )}
      </div>
      <div className="card-info">
        <div className="card-price">{`${priceStr} AZN`}</div>
        <div className="card-main-params">
          {sqm} m2 | {rooms} {t('room')} | {floor}/{totalFloors}
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
  post: PropTypes.object.isRequired
}

export default PostItem
