import React, { useState, useEffect, useRef } from 'react'
import FilterButton from '../filterButton/filterButton.component'
import PriceFilter from '../filters/priceFilter.component'
import { useTranslation } from 'react-i18next'

import './searchbar.style.scss'

let prevScrollPos = window.pageYOffset

const Searchbar = ({ navRef }) => {
  let containerRef = useRef(null)

  const [classes, setClasses] = useState('')
  const [filter, setFilter] = useState('')
  const [t] = useTranslation()

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
          setClasses(`searchbar-fixed ${!scrollUp ? 'searchbar-hidden' : ''}`)
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
  }, [classes, navRef])

  return (
    <div ref={containerRef} style={{ height: '50px' }}>
      <section className={`searchbar ${classes}`}>
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
          />
          <FilterButton
            name={t('postList.filters.estateType')}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </section>
    </div>
  )
}

export default Searchbar
