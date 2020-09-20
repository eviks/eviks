import React from 'react'
import { useHistory } from 'react-router-dom'
import { updateURLParams } from '../../../../actions/post'
import { connect } from 'react-redux'
import Radio from '../../../layout/form/radio/radio.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './filters.style.scss'

const EstateTypeFilter = ({ filters, updateURLParams }) => {
  const history = useHistory()

  const { estateType, apartmentType } = filters

  const filtersOnChange = e => {
    const value = e.target.value
    if (value === 'newBuilding' || value === 'secondaryBuilding') {
      updateURLParams(
        { apartmentType: value, estateType: 'apartment' },
        history
      )
    } else {
      updateURLParams(
        {
          estateType: value === 'any' ? null : value,
          apartmentType: ''
        },
        history
      )
    }
  }

  const [t] = useTranslation()

  const options = [
    {
      input: {
        id: `any`,
        name: 'estateType',
        value: `any`,
        checked: estateType === 'any' || estateType == null
      },
      label: t('postList.estateTypes.any'),
      icon: <i className="fas fa-infinity fa-2x"></i>
    },
    {
      input: {
        id: `apartment`,
        name: 'estateType',
        value: `apartment`,
        checked: estateType === 'apartment' && !apartmentType
      },
      label: t('postList.estateTypes.apartment'),
      icon: <i className="far fa-building fa-2x"></i>
    },
    {
      input: {
        id: `newBuilding`,
        name: 'estateType',
        value: `newBuilding`,
        checked: apartmentType === 'newBuilding'
      },
      label: t('postList.estateTypes.newBuilding'),
      icon: <i className="far fa-building fa-2x"></i>
    },
    {
      input: {
        id: `secondaryBuilding`,
        name: 'estateType',
        value: `secondaryBuilding`,
        checked: apartmentType === 'secondaryBuilding'
      },
      label: t('postList.estateTypes.secondaryBuilding'),
      icon: <i className="far fa-building fa-2x"></i>
    },
    {
      input: {
        id: `house`,
        name: 'estateType',
        value: `house`,
        checked: estateType === 'house'
      },
      label: t('postList.estateTypes.house'),
      icon: <i className="fas fa-home fa-2x"></i>
    }
  ]

  return (
    <form>
      <h4 className="filter-title">{t('postList.filters.estateType')}</h4>
      <div className="estate-type estate-type-filters">
        <Radio options={options} size="lg" onChange={filtersOnChange} />
      </div>
    </form>
  )
}

EstateTypeFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  updateURLParams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  filters: state.post.posts.filters
})

export default connect(mapStateToProps, { updateURLParams })(EstateTypeFilter)
