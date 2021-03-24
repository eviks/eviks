import React, { Fragment } from 'react'
import Hero from './hero/hero.component'
import QuickLinks from './quickLinks/quickLinks.component'
import SwipeBlock from './swipeBlock/swipeBlock.component'
import { useTranslation } from 'react-i18next'
import QuickLinkApartment from '../../assets/img/photos/QuickLinkApartment.jpg'
import quickLinkHouseImg from '../../assets/img/photos/QuickLinkHouse.jpg'

import './landing.style.scss'

const Landing = () => {
  const [t] = useTranslation()

  const buyAppartmentLinks = [
    { name: t('landing.oneRoom'), url: '/posts?rooms=1&estateType=apartment' },
    { name: t('landing.twoRoom'), url: '/posts?rooms=2&estateType=apartment' },
    {
      name: t('landing.threeRoom'),
      url: '/posts?rooms=3&estateType=apartment',
    },
    {
      name: t('landing.documented'),
      url: '/posts?documented=true&estateType=apartment',
    },
  ]

  const buyHouseLinks = [
    { name: t('landing.oneRoom'), url: '/posts?rooms=1&estateType=house' },
    { name: t('landing.twoRoom'), url: '/posts?rooms=2&estateType=house' },
    { name: t('landing.threeRoom'), url: '/posts?rooms=3&estateType=house' },
    {
      name: t('landing.documented'),
      url: '/posts?documented=true&estateType=house',
    },
  ]

  return (
    <Fragment>
      <Hero />
      <div className="container">
        <h4 className="lead-2x px-05">{t('landing.quickLinks')}</h4>
        <div className="quick-links mb-2">
          <QuickLinks
            links={buyAppartmentLinks}
            title={t('landing.buyAppartment')}
            img={QuickLinkApartment}
          />
          <QuickLinks
            links={buyHouseLinks}
            title={t('landing.buyHouse')}
            img={quickLinkHouseImg}
          />
        </div>
        <SwipeBlock />
      </div>
    </Fragment>
  )
}

export default Landing
