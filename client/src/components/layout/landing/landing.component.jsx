import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './landing.styles.scss'

const Landing = () => {
  const [t] = useTranslation()
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">{t('welcome')}</h1>
          <p className="lead">{t('slogan')}</p>
          <div className="buttons">
            <Link to="search" className="btn btn-primary">
              {t('search')}
            </Link>
            <Link to="create" className="btn btn-ghost">
              {t('sell')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
