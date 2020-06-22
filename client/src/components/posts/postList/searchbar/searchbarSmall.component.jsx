import React, { Fragment, useState } from 'react'
import AllFilters from '../allFilters/allFilters.component'
import Ripple from '../../../layout/ripple/ripple.component'
import { useTranslation } from 'react-i18next'

import './searchbar.style.scss'

const SearchbarSmall = () => {
  const [showAllFilters, toggleAllFilters] = useState(false)

  const [t] = useTranslation()

  return (
    <Fragment>
      {showAllFilters && <AllFilters />}
      <section className="searchbar-small light-border">
        <button
          className="filter-button"
          onClick={() => toggleAllFilters(!showAllFilters)}
        >
          <i className="fas fa-search"></i> {t('postList.filters.allFilters')}
          <Ripple />
        </button>
      </section>
    </Fragment>
  )
}

export default SearchbarSmall
