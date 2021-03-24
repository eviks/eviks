import React from 'react'
import LocalizedLink from '../../../components/localization/LocalizedLink.component'
import PropTypes from 'prop-types'

import './quickLinks.style.scss'

const QuickLinks = ({ links, title, img }) => {
  return (
    <div className="quick-links-wrapper light-border my-1">
      <div className="quick-links-img">
        <picture>
          <source media="(min-width:480px)" srcSet={img} />
          <img src={img} alt="Quick links" />
        </picture>
      </div>
      <div className="quick-links-content">
        <div className="quick-links-content-inner">
          <h4>{title}</h4>
          {links.map((link, index) => (
            <LocalizedLink to={link.url} className="link link-blue" key={index}>
              {link.name}
            </LocalizedLink>
          ))}
        </div>
      </div>
    </div>
  )
}

QuickLinks.propTypes = {
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

export default QuickLinks
