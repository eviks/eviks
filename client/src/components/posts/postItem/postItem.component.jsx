import React from 'react'
import { useHistory } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import {
  renderLeftNav,
  renderRightNav
} from '../../layout/arrowButtons/galleryButtons.component'
import LikeButton from '../likeButton/likeButton.component'
import Moment from 'react-moment'
import { useTranslation } from 'react-i18next'
import { baseUrl } from '../../../App'
import PropTypes from 'prop-types'

import './postItem.style.scss'

const PostItem = ({
  post: {
    estateType,
    city,
    district,
    subdistrict,
    sqm,
    lotSqm,
    rooms,
    floor,
    totalFloors,
    price,
    date,
    _id,
    images,
    documented,
    mortgage
  }
}) => {
  const history = useHistory()
  const [t] = useTranslation()

  const redirectToPost = () => history.push(`${baseUrl}/posts/${_id}`)

  const priceStr = price.toLocaleString('az-AZ', {
    style: 'decimal'
  })

  const getPostImages = () => {
    return images.map(image => ({ original: image.thumb }))
  }

  return (
    <div className="card material-border">
      <div className="card-gallery-wrapper">
        <ImageGallery
          items={getPostImages()}
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
          lazyLoad={true}
          onClick={redirectToPost}
          renderLeftNav={renderLeftNav}
          renderRightNav={renderRightNav}
        />
        <LikeButton postId={_id} />
      </div>
      <div className="card-info" onClick={redirectToPost}>
        <div className="card-block">
          <div>
            <div className="lead-2x lead-bold">{`${priceStr} ₼`}</div>
            <div className="lead-2x">
              {subdistrict ? subdistrict.name : district.name}
            </div>
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
            {city.name} <Moment format="DD.MM.YY">{date}</Moment>
          </div>
          <div className="card-features">
            {documented && (
              <div className="card-feature tooltip">
                <i className="fas fa-stamp"></i>
                <div className="tooltip-text tooltip-text-left">
                  {t('postList.documented')}
                </div>
              </div>
            )}
            {mortgage && (
              <div className="card-feature tooltip">
                <i className="fas fa-percent"></i>
                <div className="tooltip-text tooltip-text-left">
                  {t('postList.mortgage')}
                </div>
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
