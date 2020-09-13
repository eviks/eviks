import React from 'react'
import Checkbox from '../../../../layout/form/checkbox/checkbox.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Square = ({ filters, checkboxOnChange }) => {
  const { documented, mortgage, redevelopment } = filters

  const [t] = useTranslation()

  return (
    <div className="filter-group">
      <div className="filter-block">
        <Checkbox
          label={t('postList.filters.documented')}
          showFieldName={true}
          options={{
            name: 'documented',
            id: 'documented',
            checked: documented
          }}
          onChange={checkboxOnChange}
        />
        <Checkbox
          label={t('postList.filters.mortgage')}
          showFieldName={true}
          options={{
            name: 'mortgage',
            id: 'mortgage',
            checked: mortgage
          }}
          onChange={checkboxOnChange}
        />
        <Checkbox
          label={t('postList.filters.redevelopment')}
          showFieldName={true}
          options={{
            name: 'redevelopment',
            id: 'redevelopment',
            checked: redevelopment
          }}
          onChange={checkboxOnChange}
        />
      </div>
    </div>
  )
}

Square.propTypes = {
  filters: PropTypes.object.isRequired,
  checkboxOnChange: PropTypes.func.isRequired
}

export default Square
