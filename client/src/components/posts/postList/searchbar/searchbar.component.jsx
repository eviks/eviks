import React, { useState, useEffect, useRef } from 'react'
import { removeAllFilters } from '../../../../actions/post'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FilterButton from '../filterButton/filterButton.component'
import DealTypeFilter from '../filters/dealTypeFilter.component'
import PriceFilter from '../filters/priceFilter.component'
import RoomFilter from '../filters/roomFilter.component'
import EstateTypeFilter from '../filters/estateTypeFilter.component'
import MoreFilters from '../filters/moreFilters.component'
import LocationsFilter from '../filters/locationFilters/locationsFilter.component'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import { getURLParams } from '../../../../services/util'
import {
  getDealTypeFilterTitle,
  getPriceFilterTitle,
  getRoomsFilterTitle,
  estateTypeFilterTitle,
} from './filterTitles'
import PropTypes from 'prop-types'

import './searchbar.style.scss'

let prevScrollPos = window.pageYOffset

const Searchbar = ({ navRef, removeAllFilters, dealType }) => {
  const history = useHistory()
  const urlParameters = Object.fromEntries(
    getURLParams(history.location.search)
  )

  let containerRef = useRef(null)

  const [classes, setClasses] = useState('')
  const [filter, setFilter] = useState('')
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [showLocationsFilter, setShowLocationsFilter] = useState(false)
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

    const isInViewport = (element) => {
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
    removeAllFilters()
    history.push('?')
  }

  return (
    <div ref={containerRef} className="searchbar-wrapper">
      <section className={`searchbar ${classes}`}>
        <div className="filter-buttons">
          {/* Locations */}
          <button
            className="link link-blue"
            onClick={() => setShowLocationsFilter(true)}
          >
            {t('postList.filters.locations.district')}
          </button>
          <ReactModal
            isOpen={showLocationsFilter}
            onRequestClose={() => setShowLocationsFilter(false)}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <LocationsFilter
              closeFilter={() => setShowLocationsFilter(false)}
            />
          </ReactModal>
          {/* Deal type */}
          <FilterButton
            title={getDealTypeFilterTitle(dealType)}
            name={'dealType'}
            filter={filter}
            setFilter={setFilter}
            component={DealTypeFilter}
          />
          {/* Price */}
          <FilterButton
            title={getPriceFilterTitle(urlParameters)}
            name={'price'}
            filter={filter}
            setFilter={setFilter}
            component={PriceFilter}
          />
          {/* Rooms */}
          <FilterButton
            title={getRoomsFilterTitle(urlParameters)}
            name={'rooms'}
            filter={filter}
            setFilter={setFilter}
            component={RoomFilter}
          />
          {/* Estate type */}
          <FilterButton
            title={estateTypeFilterTitle(urlParameters)}
            name={'estateType'}
            filter={filter}
            setFilter={setFilter}
            component={EstateTypeFilter}
          />
          {/* More */}
          <FilterButton
            title={t('postList.filters.more')}
            name={'more'}
            filter={filter}
            setFilter={setFilter}
            moreFilters={true}
            component={MoreFilters}
          />
          {/* Remove filters */}
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
  removeAllFilters: PropTypes.func.isRequired,
  dealType: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  dealType: state.post.posts.filters.dealType,
})

export default connect(mapStateToProps, { removeAllFilters })(Searchbar)
