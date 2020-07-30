import React, { Fragment } from 'react'
import Hero from './hero/hero.component'
import SwipeBlock from './swipeBlock/swipeBlock.component'
import './landing.style.scss'

const Landing = () => {
  return (
    <Fragment>
      <Hero />
      <div className="container">
        <SwipeBlock />
      </div>
    </Fragment>
  )
}

export default Landing
