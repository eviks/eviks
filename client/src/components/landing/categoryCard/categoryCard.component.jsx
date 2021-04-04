import React from 'react'
import LocalizedLink from '../../localization/LocalizedLink.component'
import PropTypes from 'prop-types'

import './categoryCard.style.scss'

const CategoryCard = ({ links, title, img }) => {
  return (
    <div className="category-card">
      <div className="category-card-content">
        <p className="lead text-light">{title}</p>
        <div className="category-card-options">
          {links.map((link, index) => (
            <LocalizedLink
              to={link.url}
              className="link link-light"
              key={index}
            >
              {link.name}
            </LocalizedLink>
          ))}
        </div>
      </div>
      <picture>
        <source media="(min-width:480px)" srcSet={img} />
        <img src={img} alt="category"></img>
      </picture>
      <div className="dark-overlay-strong"></div>
    </div>
  )
}

CategoryCard.propTypes = {
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

export default CategoryCard
