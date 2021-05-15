import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SvgAirConditioner,
  SvgBalcony,
  SvgDishwasher,
  SvgDocument,
  SvgElectricity,
  SvgFridge,
  SvgGarage,
  SvgGas,
  SvgHotTube,
  SvgMortgage,
  SvgOven,
  SvgPaintRoller,
  SvgPool,
  SvgRadiator,
  SvgRedevelopment,
  SvgShower,
  SvgSofa,
  SvgTelephone,
  SvgTv,
  SvgWashingMachine,
  SvgWifi,
} from '../../../layout/icons'
import PropTypes from 'prop-types'

import './postFeatures.style.scss'

const Feature = ({ flag, icon: Icon, name, special = false }) => {
  return flag ? (
    <div className="feature-item">
      <div className="mr-05">
        {special ? <Icon width={'2em'} height={'2em'} /> : <Icon />}
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
    refrigerator,
  },
}) => {
  const [t] = useTranslation()

  return (
    <div className="my-1">
      <div className="features my-1">
        <Feature
          flag={maintenance}
          icon={SvgPaintRoller}
          name={t(`post.features.maintenance.${maintenance}`)}
          special={true}
        />
        <Feature
          flag={documented}
          icon={SvgDocument}
          name={t('post.features.documented')}
          special={true}
        />
        <Feature
          flag={mortgage}
          icon={SvgMortgage}
          name={t('post.features.mortgage')}
          special={true}
        />
        <Feature
          flag={redevelopment}
          icon={SvgRedevelopment}
          name={t('post.features.redevelopment')}
          special={true}
        />
      </div>
      <div className="divider" />
      <div className="features my-1">
        <h2>{t('post.features.title')}</h2>
        {estateType === 'house' && (
          <Fragment>
            <Feature
              flag={garage}
              icon={SvgGarage}
              name={t('post.features.garage')}
            />
            <Feature
              flag={pool}
              icon={SvgPool}
              name={t('post.features.pool')}
            />
            <Feature
              flag={bathhouse}
              icon={SvgHotTube}
              name={t('post.features.bathhouse')}
            />
          </Fragment>
        )}
        <Feature
          flag={balcony}
          icon={SvgBalcony}
          name={t('post.features.balcony')}
        />
        <Feature
          flag={furniture}
          icon={SvgSofa}
          name={t('post.features.furniture')}
        />
        <Feature
          flag={kitchenFurniture}
          icon={SvgOven}
          name={t('post.features.kitchenFurniture')}
        />
        <Feature flag={cctv} icon={SvgTv} name={t('post.features.cctv')} />
        <Feature
          flag={phone}
          icon={SvgTelephone}
          name={t('post.features.phone')}
        />
        <Feature
          flag={internet}
          icon={SvgWifi}
          name={t('post.features.internet')}
        />
        <Feature
          flag={electricity}
          icon={SvgElectricity}
          name={t('post.features.electricity')}
        />
        <Feature flag={gas} icon={SvgGas} name={t('post.features.gas')} />
        <Feature
          flag={water}
          icon={SvgShower}
          name={t('post.features.water')}
        />
        <Feature
          flag={heating}
          icon={SvgRadiator}
          name={t('post.features.heating')}
        />
        <Feature flag={tv} icon={SvgTv} name={t('post.features.tv')} />
        <Feature
          flag={conditioner}
          icon={SvgAirConditioner}
          name={t('post.features.conditioner')}
        />
        <Feature
          flag={washingMachine}
          icon={SvgWashingMachine}
          name={t('post.features.washingMachine')}
        />
        <Feature
          flag={dishwasher}
          icon={SvgDishwasher}
          name={t('post.features.dishwasher')}
        />
        <Feature
          flag={refrigerator}
          icon={SvgFridge}
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
