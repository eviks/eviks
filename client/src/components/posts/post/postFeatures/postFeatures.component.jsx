import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './postFeatures.style.scss'

const Feature = ({ flag, icon, name, special = false }) => {
  return flag ? (
    <div className={`${special ? 'special' : ''}`}>
      <i className={`feature-item-icon ${icon}`}></i> {name}
    </div>
  ) : null
}

const PostFeatures = ({
  post: {
    documented,
    mortgage,
    maintenance,
    redevelopment,
    estateType,
    balcony,
    furniture,
    kitchenFurniture,
    garage,
    pool,
    bathhouse,
    cctv,
    phone,
    internet,
    electricity,
    gas,
    water,
    heating,
    tv,
    conditioner,
    washingMachine,
    dishwasher,
    refrigerator,
  },
}) => {
  const [t] = useTranslation()

  return (
    <div className="my-1">
      <h2>{t('post.features.title')}</h2>
      <div className="features-special my-1">
        <Feature
          flag={maintenance}
          icon="fas fa-paint-roller"
          name={t(`post.features.maintenance.${maintenance}`)}
          special={true}
        />
        <Feature
          flag={documented}
          icon="fas fa-check"
          name={t('post.features.documented')}
          special={true}
        />
        <Feature
          flag={mortgage}
          icon="fas fa-coins"
          name={t('post.features.mortgage')}
          special={true}
        />
        <Feature
          flag={redevelopment}
          icon="fas fa-pencil-ruler"
          name={t('post.features.redevelopment')}
          special={true}
        />
      </div>
      <div className="divider" />
      <div className="features my-1">
        {estateType === 'house' && (
          <Fragment>
            <Feature
              flag={garage}
              icon="fas fa-car"
              name={t('post.features.garage')}
            />
            <Feature
              flag={pool}
              icon="fas fa-swimming-pool"
              name={t('post.features.pool')}
            />
            <Feature
              flag={bathhouse}
              icon="fas fa-hot-tub"
              name={t('post.features.bathhouse')}
            />
          </Fragment>
        )}
        <Feature
          flag={balcony}
          icon="fas fa-building"
          name={t('post.features.balcony')}
        />
        <Feature
          flag={furniture}
          icon="fas fa-couch"
          name={t('post.features.furniture')}
        />
        <Feature
          flag={kitchenFurniture}
          icon="fas fa-utensils"
          name={t('post.features.kitchenFurniture')}
        />
        <Feature flag={cctv} icon="fas fa-tv" name={t('post.features.cctv')} />
        <Feature
          flag={phone}
          icon="fas fa-phone-alt"
          name={t('post.features.phone')}
        />
        <Feature
          flag={internet}
          icon="fas fa-wifi"
          name={t('post.features.internet')}
        />
        <Feature
          flag={electricity}
          icon="fas fa-bolt"
          name={t('post.features.electricity')}
        />
        <Feature flag={gas} icon="fas fa-burn" name={t('post.features.gas')} />
        <Feature
          flag={water}
          icon="fas fa-shower"
          name={t('post.features.water')}
        />
        <Feature
          flag={heating}
          icon="fas fa-fire"
          name={t('post.features.heating')}
        />
        <Feature flag={tv} icon="fas fa-tv" name={t('post.features.tv')} />
        <Feature
          flag={conditioner}
          icon="fas fa-wind"
          name={t('post.features.conditioner')}
        />
        <Feature
          flag={washingMachine}
          icon="fas fa-recycle"
          name={t('post.features.washingMachine')}
        />
        <Feature
          flag={dishwasher}
          icon="fas fa-soap"
          name={t('post.features.dishwasher')}
        />
        <Feature
          flag={refrigerator}
          icon="fas fa-snowflake"
          name={t('post.features.refrigerator')}
        />
      </div>
      <div className="divider" />
    </div>
  )
}

PostFeatures.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostFeatures
