import React from 'react'
import { useHistory } from 'react-router-dom'
import { setSrearchFilters, updateURLParams } from '../../../../actions/post'
import { connect } from 'react-redux'
import MinMaxFilter from './minMaxFilter.component'
import Checkbox from '../../../layout/form/checkbox/checkbox.component'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './filters.style.scss'

const PriceFilter = ({ filters, setSrearchFilters, updateURLParams }) => {
  const history = useHistory()

  const { bargain } = filters

  const filtersOnChange = event => {
    const { name, value } = event.target

    const numericValue = value.replace(/\s/g, '').replace(/AZN/g, '')
    setSrearchFilters({
      [name]: parseInt(numericValue === '' ? 0 : numericValue, 10)
    })
  }

  const filtersOnBlur = event => {
    updateURLParams({}, history)
  }

  const checkboxOnChange = event => {
    const { name, checked } = event.target
    updateURLParams({ [name]: checked }, history)
  }

  const priceMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 0, // how many digits allowed after the decimal
    integerLimit: 15, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false
  })

  const [t] = useTranslation()

  return (
    <form>
      <h4 className="filter-title">{t('postList.filters.price')}</h4>
      <MinMaxFilter
        mask={priceMask}
        className={''}
        onChange={filtersOnChange}
        onBlur={filtersOnBlur}
        minInput={{
          name: 'priceMin',
          placeholder: t('postList.filters.min')
        }}
        maxInput={{
          name: 'priceMax',
          placeholder: t('postList.filters.max')
        }}
      />
      <Checkbox
        label={t('postList.filters.bargain')}
        showFieldName={true}
        options={{
          name: 'bargain',
          id: 'bargain',
          checked: bargain
        }}
        onChange={checkboxOnChange}
      />
    </form>
  )
}

PriceFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired,
  updateURLParams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  filters: state.post.posts.filters
})

export default connect(mapStateToProps, { setSrearchFilters, updateURLParams })(
  PriceFilter
)
