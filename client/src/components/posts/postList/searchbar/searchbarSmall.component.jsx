import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../../../../actions/post'
import AllFilters from '../allFilters/allFilters.component'
import Ripple from '../../../layout/ripple/ripple.component'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './searchbar.style.scss'

const SearchbarSmall = ({ filters, getPosts }) => {
  const history = useHistory()

  const [showAllFilters, toggleAllFilters] = useState(false)

  const handleOnClick = () => {
    if (!showAllFilters) {
      toggleAllFilters(true)
    } else {
      getPosts(1, filters, history)
      toggleAllFilters(false)
    }
  }

  const [t] = useTranslation()

  return (
    <Fragment>
      <CSSTransition
        in={showAllFilters}
        timeout={400}
        classNames="filters-transition"
        unmountOnExit
      >
        <AllFilters toggleAllFilters={toggleAllFilters} />
      </CSSTransition>

      <section className="searchbar-small light-border">
        <button className="mobile-button" onClick={() => handleOnClick()}>
          <i className="fas fa-search"></i>{' '}
          {t(`postList.filters.${showAllFilters ? 'search' : 'allFilters'}`)}
          <Ripple />
        </button>
      </section>
    </Fragment>
  )
}

SearchbarSmall.propTypes = {
  filters: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

export default connect(mapStateToProps, { getPosts })(SearchbarSmall)
