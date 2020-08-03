import React from 'react'
import { useHistory } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import {
  renderLeftNav,
  renderRightNav
} from '../../layout/arrowButtons/galleryButtons.component'
import Moment from 'react-moment'
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
  const history = useHistory()
  const [t] = useTranslation()

  const redirectToPost = () => history.push(`/posts/${_id}`)

  const priceStr = price.toLocaleString('az-AZ', {
    style: 'decimal'
  })

  const getPostPhotos = () => {
    return photos.map(photo => ({ original: photo.thumb }))
  }

  return (
    <div className="card shadow-border">
      {
        <ImageGallery
          items={getPostPhotos()}
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
          lazyLoad={true}
          onClick={redirectToPost}
          renderLeftNav={renderLeftNav}
          renderRightNav={renderRightNav}
        />
      }
      <div className="card-info" onClick={redirectToPost}>
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
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostItem
