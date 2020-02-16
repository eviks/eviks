import React from 'react'
import { Link } from 'react-router-dom'
import './landing.styles.scss'
import { useTranslation } from 'react-i18next'

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
            <Link to="create" className="btn btn-secondary">
              {t('sell')}
            </Link>
          </div>
          <div className="scroll-down-icon">
            <i className="fas fa-mouse fa-3x"></i>
            <i className="fas fa-caret-down fa-3x"></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing