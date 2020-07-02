import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { removeFilters } from '../../../../actions/post'
import FilterButton from '../filterButton/filterButton.component'
import PriceFilter from '../filters/priceFilter.component'
import RoomFilter from '../filters/roomFilter.component'
import EstateTypeFilter from '../filters/estateTypeFilter.component'
import MoreFilters from '../filters/moreFilters.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './searchbar.style.scss'

let prevScrollPos = window.pageYOffset

const Searchbar = ({ navRef, removeFilters }) => {
  let containerRef = useRef(null)

  const [classes, setClasses] = useState('')
  const [filter, setFilter] = useState('')
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [t] = useTranslation()

  useEffect(() => {
    setFilterIsOpen(filter !== '')
  }, [filter])

  useEffect(() => {
    const onScroll = () => {
      let currentScrollPos = window.pageYOffset
      let scrollUp = prevScrollPos > currentScrollPos
      prevScrollPos = currentScrollPos
      if (
        !navRef ||
        !containerRef ||
        isInViewport(navRef.current) ||
        (isInViewport(containerRef.current) && !scrollUp)
      ) {
        setClasses('searchbar-relative')
      } else {
        if (classes === 'searchbar-relative') {
          setClasses('searchbar-fixed searchbar-hidden searchbar-transition')
        } else {
          setClasses(
            `searchbar-fixed ${
              !scrollUp && !filterIsOpen ? 'searchbar-hidden' : ''
            }`
          )
        }
      }
    }

    const isInViewport = element => {
      const bounding = element.getBoundingClientRect()
      return bounding.bottom >= 0
    }

    const watchScroll = () => {
      window.addEventListener('scroll', onScroll)
    }

    watchScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [classes, navRef, filterIsOpen])

  const handleRemoveFilters = () => {
    removeFilters()
  }

  return (
    <div ref={containerRef} className="searchbar-wrapper">
      <section className={`searchbar light-shadow-border ${classes}`}>
        <div className="filter-buttons">
          <FilterButton
            name={t('postList.filters.price')}
            filter={filter}
            setFilter={setFilter}
            component={PriceFilter}
          />
          <FilterButton
            name={t('postList.filters.rooms')}
            filter={filter}
            setFilter={setFilter}
            component={RoomFilter}
          />
          <FilterButton
            name={t('postList.filters.estateType')}
            filter={filter}
            setFilter={setFilter}
            component={EstateTypeFilter}
          />
          <FilterButton
            name={t('postList.filters.more')}
            filter={filter}
            setFilter={setFilter}
            moreFilters={true}
            component={MoreFilters}
          />
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-ghost-sd btn-md"
              onClick={handleRemoveFilters}
            >
              <i className="fas fa-broom"></i> {t('postList.filters.remove')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

Searchbar.propTypes = {
  navRef: PropTypes.object.isRequired,
  removeFilters: PropTypes.func.isRequired
}

export default connect(null, { removeFilters })(Searchbar)
