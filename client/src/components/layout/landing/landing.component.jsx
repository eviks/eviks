import React from 'react'
import { Link } from 'react-router-dom'
import './landing.styles.scss'

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">It's good to be home</h1>
          <p className="lead">Find something more than just a place to stay</p>
          <div className="buttons">
            <Link to="search" className="btn btn-primary">
              Search
            </Link>
            <Link to="create" className="btn btn-secondary">
              Add your add
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
