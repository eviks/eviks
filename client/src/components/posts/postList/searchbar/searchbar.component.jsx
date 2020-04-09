import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './searchbar.style.scss'

const Searchbar = () => {
  const [hide, setHideFlag] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollUp, setScrollUp] = useState(false)

  window.onscroll = () => {
    const currentScrollPos = window.pageYOffset
    setHideFlag(scrollPosition < currentScrollPos && !isElementInViewport())
    setScrollUp(scrollPosition > currentScrollPos)
    setScrollPosition(currentScrollPos)
  }

  const isElementInViewport = () => {
    const el = document.getElementById('navbar')
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  return (
    <section
      className={`searchbar ${
        hide ? 'searchbar-hide' : scrollUp ? 'searchbar-scroll-up' : ''
      }`}
    >
      <div className="filter-buttons">
        <button>Location</button>
        <button>Price</button>
        <button>Rooms</button>
        <button>Home Type</button>
      </div>
    </section>
  )
}

Searchbar.propTypes = {}

export default Searchbar
