import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import {
  renderLeftNav,
  renderRightNav,
} from '../../layout/arrowButtons/galleryButtons.component';
import LikeButton from '../buttons/likeButton/likeButton.component';
import EditButton from '../buttons/editButton/editButton.component';
import DeleteButton from '../buttons/deleteButton/deleteButton.component';
import {
  SvgDocument,
  SvgMortgage,
  SvgDoor,
  SvgGarden,
  SvgSqm,
  SvgStairs,
} from '../../layout/icons';
import Moment from 'react-moment';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './postItem.style.scss';

const PostItem = ({
  auth,
  post: {
    address,
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
    mortgage,
    user,
  },
  locale,
}) => {
  const history = useHistory();
  const [t] = useTranslation();

  const redirectToPost = () => history.push(`/${locale}/posts/${_id}`);

  const priceStr = price.toLocaleString('az-AZ', {
    style: 'decimal',
  });

  const getPostImages = () => {
    return images.map((id) => ({
      original: `/uploads/post_images/${id}/image_320.png`,
    }));
  };

  return (
    <div className="card light-border">
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
        <div className="card-btn-container">
          {auth.user && auth.user._id === user ? (
            <Fragment>
              <EditButton postId={_id} />
              <DeleteButton postId={_id} />
            </Fragment>
          ) : (
            <LikeButton postId={_id} />
          )}
        </div>
      </div>
      <div className="card-info" onClick={redirectToPost}>
        <div className="lead lead-bold">{`${priceStr} ₼`}</div>
        <div className="mb-05">
          <div className="lead">
            {subdistrict ? subdistrict.name : district.name}
          </div>
          <div className="text-secondary">
            {city.name}, {address}
          </div>
        </div>
        <div className="card-param-wrapper mb-05">
          <div className="card-param">
            <SvgSqm /> {sqm} m²
          </div>
          <div className="card-param">
            <SvgDoor /> {rooms} {t('postList.room')}
          </div>
          {estateType === 'apartment' ? (
            <div className="card-param">
              <SvgStairs /> {floor}/{totalFloors}
            </div>
          ) : (
            <div className="card-param">
              <SvgGarden /> {lotSqm} m²
            </div>
          )}
        </div>
        <div className="card-bottom">
          <div className="text-secondary">
            <Moment format="DD.MM.YY">{date}</Moment>
          </div>
          <div className="card-feature-wrapper">
            <div className="card-features">
              {documented && (
                <div className="card-feature tooltip">
                  <SvgDocument />
                  <div className="tooltip-text tooltip-text-left">
                    {t('postList.documented')}
                  </div>
                </div>
              )}
              {mortgage && (
                <div className="card-feature tooltip">
                  <SvgMortgage />
                  <div className="tooltip-text tooltip-text-left">
                    {t('postList.mortgage')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  locale: state.locale.locale,
});

export default connect(mapStateToProps)(PostItem);
