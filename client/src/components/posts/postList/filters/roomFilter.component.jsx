import React from 'react'
import { useHistory } from 'react-router-dom'
import MinMaxFilter from './minMaxFilter.component'
import { setSrearchFilters, updateURLParams } from '../../../../actions/post'
import { connect } from 'react-redux'
import Radio from '../../../layout/form/radio/radio.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './filters.style.scss'

const RoomFilter = ({ filters, setSrearchFilters, updateURLParams }) => {
  const history = useHistory()

  const { roomsMin } = filters

  const filtersOnChange = e => {
    updateURLParams(
      {
        roomsMin: e.target.value === roomsMin ? 0 : e.target.value,
        roomsMax: 0
      },
      history
    )
  }

  const roomsRangeOnChange = event => {
    const { name, value } = event.target

    const numericValue = value.replace(/\s/g, '').replace(/AZN/g, '')
    setSrearchFilters({
      [name]: parseInt(numericValue === '' ? 0 : numericValue, 10)
    })
  }

  const roomsRangeOnBlur = event => {
    updateURLParams({}, history)
  }

  // Array of options
  const options = []
  for (let index = 1; index <= 5; index++) {
    options.push({
      input: {
        id: index.toString(),
        name: 'rooms',
        value: index,
        checked: roomsMin === index.toString()
      },
      label: `${index}+`
    })
  }

  const [t] = useTranslation()

  return (
    <form>
      <h4 className="filter-title">{t('postList.filters.rooms')}</h4>
      <div className="row-group room-filters">
        <Radio options={options} onChange={filtersOnChange} />
      </div>
      {/* Rooms range */}
      <div className="text-secondary rooms-range-tip">
        {t('postList.filters.roomsRangeTip')}
      </div>
      <MinMaxFilter
        className={''}
        onChange={roomsRangeOnChange}
        onBlur={roomsRangeOnBlur}
        minInput={{
          name: 'roomsMin',
          placeholder: t('postList.filters.min')
        }}
        maxInput={{
          name: 'roomsMax',
          placeholder: t('postList.filters.max')
        }}
      />
    </form>
  )
}

const mapStateToProps = state => ({
  filters: state.post.posts.filters
})

RoomFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired,
  updateURLParams: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setSrearchFilters, updateURLParams })(
  RoomFilter
)
