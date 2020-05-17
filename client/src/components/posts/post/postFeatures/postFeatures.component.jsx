import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './postFeatures.style.scss'

const Feature = ({ flag, icon, name }) => {
  return flag ? (
    <div style={{ margin: '0.5rem 0' }}>
      <i className={icon} style={{ marginRight: '0.5rem' }}></i> {name}
    </div>
  ) : null
}

const SpecialFeature = ({ flag, icon, name }) => {
  return flag ? (
    <div className="features-special-wrapper">
      <div className="features-special-icon light-border">
        <i className={icon}></i>
      </div>
      {name}
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
    refrigerator
  }
}) => {
  const getRepairStatus = () => {
    switch (maintenance) {
      case 'redecorated':
        return 'Косметический ремонт'
      case 'designed':
        return 'Дизайнерский ремонт'
      case 'noMaintenance':
      default:
        return 'Требуется ремонт'
    }
  }

  return (
    <div className="my-1">
      <h2>Дополнительно</h2>
      {/* Speacial */}
      <div className="features-special">
        <SpecialFeature
          flag={maintenance}
          icon="fas fa-paint-roller"
          name={getRepairStatus()}
        />
        <SpecialFeature
          flag={documented}
          icon="fas fa-check"
          name="Есть купчая"
        />
        <SpecialFeature flag={mortgage} icon="fas fa-coins" name="Ипотека" />
        <SpecialFeature
          flag={redevelopment}
          icon="fas fa-pencil-ruler"
          name="Перепланировка"
        />
      </div>
      <div className="features-wrapper my-1">
        {estateType === 'house' && (
          <Fragment>
            <Feature flag={garage} icon="fas fa-car" name="Гараж" />
            <Feature flag={pool} icon="fas fa-swimming-pool" name="Бассейн" />
            <Feature flag={bathhouse} icon="fas fa-hot-tub" name="Баня" />
          </Fragment>
        )}
        <Feature flag={balcony} icon="fas fa-building" name="Балкон" />
        <Feature flag={furniture} icon="fas fa-couch" name="Мебель" />
        <Feature
          flag={kitchenFurniture}
          icon="fas fa-utensils"
          name="Кухонная мебель"
        />
        <Feature flag={cctv} icon="fas fa-tv" name="Кабельное" />
        <Feature flag={phone} icon="fas fa-phone-alt" name="Телефон" />
        <Feature flag={internet} icon="fas fa-wifi" name="Интернет" />
        <Feature flag={electricity} icon="fas fa-bolt" name="Электричество" />
        <Feature flag={gas} icon="fas fa-burn" name="Газ" />
        <Feature flag={water} icon="fas fa-shower" name="Вода" />
        <Feature flag={heating} icon="fas fa-fire" name="Отопление" />
        <Feature flag={tv} icon="fas fa-tv" name="Телевизор" />
        <Feature flag={conditioner} icon="fas fa-wind" name="Кондиционер" />
        <Feature
          flag={washingMachine}
          icon="fas fa-recycle"
          name="Стиральная машина"
        />
        <Feature
          flag={dishwasher}
          icon="fas fa-soap"
          name="Посудомоечная машина"
        />
        <Feature
          flag={refrigerator}
          icon="fas fa-snowflake"
          name="Холодильник"
        />
      </div>
    </div>
  )
}

PostFeatures.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostFeatures
