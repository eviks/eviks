import React from 'react'
import { Link } from 'react-router-dom'
import Ripple from '../../layout/ripple/ripple.component'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const [t] = useTranslation()
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">{t('landing.title')}</h1>
          <p className="lead">{t('landing.slogan')}</p>
          <div className="buttons">
            <Link
              to="create_post"
              className="btn btn-ghost"
              style={{ marginRight: '0.5rem' }}
            >
              {t('landing.sell')}
              <Ripple />
            </Link>
            <Link to="posts" className="btn btn-primary">
              {t('landing.search')}
              <Ripple />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
