import React from 'react'
import { setSrearchFilters } from '../../../../actions/post'
import { connect } from 'react-redux'
import Input from '../../../layout/form/input/input.component'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './filters.style.scss'

const PriceFilter = ({ filters, setSrearchFilters }) => {
  const { priceMax, priceMin } = filters

  const filtersOnChange = e => {
    const { name, value } = e.target
    const numericValue = value.replace(/\s/g, '').replace(/AZN/g, '')
    setSrearchFilters({
      [name]: parseInt(numericValue === '' ? 0 : numericValue, 10)
    })
  }

  const priceMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 0, // how many digits allowed after the decimal
    integerLimit: 15, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false
  })

  const [t] = useTranslation()

  return (
    <form>
      <h4 className="filter-title">{t('postList.filters.price')}</h4>
      <div className="row-group">
        <Input
          mask={priceMask}
          required={false}
          options={{
            type: 'text',
            name: 'priceMin',
            value: priceMin === 0 ? '' : priceMin,
            placeholder: t('postList.filters.min')
          }}
          currency={true}
          onChange={filtersOnChange}
        />
        <span className="input-separator">-</span>
        <Input
          mask={priceMask}
          required={false}
          options={{
            type: 'text',
            name: 'priceMax',
            value: priceMax === 0 ? '' : priceMax,
            placeholder: t('postList.filters.max')
          }}
          currency={true}
          onChange={filtersOnChange}
        />
      </div>
    </form>
  )
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

PriceFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setSrearchFilters })(PriceFilter)
