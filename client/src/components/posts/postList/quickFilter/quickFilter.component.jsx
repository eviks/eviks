import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function useOutsideAlerter(ref, filterButtonRef, filterOnClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !filterButtonRef.current.contains(event.target)
      ) {
        filterOnClick()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, filterOnClick, filterButtonRef])
}

const QuickFilter = ({
  component: Component,
  filterButtonRef,
  filterOnClick
}) => {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, filterButtonRef, filterOnClick)

  const [t] = useTranslation()

  return (
    <div
      ref={wrapperRef}
      className="shadow-border"
      style={{
        marginTop: '0.7rem',
        padding: '1.5rem',
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: '10',
        borderRadius: '8px'
      }}
    >
      <Component />
      <div>
        <button
          className="btn btn-primary btn-md"
          onClick={() => filterOnClick()}
        >
          {t('postList.filters.doneButton')}
        </button>
      </div>
    </div>
  )
}

QuickFilter.propTypes = {
  filterOnClick: PropTypes.func.isRequired
}

export default QuickFilter
