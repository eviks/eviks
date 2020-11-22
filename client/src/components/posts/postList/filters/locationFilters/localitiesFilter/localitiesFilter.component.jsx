import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import DistrictFilter from './districtFilter.component'
import Spinner from '../../../../../layout/spinner/spinner.component'
import axios from 'axios'
import PropTypes from 'prop-types'

const LocalitiesFilters = ({
  city,
  selectedLocalities,
  setSelectedLocalities
}) => {
  const [loading, setLoading] = useState(true)

  const [districts, setDistricts] = useState([])

  // Get all districts of the city
  useEffect(() => {
    const fetchData = async () => {
      const districtIds = city.children.map(district => district.id)
      try {
        const result = await axios.get(
          `/api/localities/getByIds/?ids=${districtIds.join()}`
        )

        // Sort data before updating state
        const collator = new Intl.Collator('az', {
          numeric: true,
          sensitivity: 'base',
          usage: 'sort'
        })

        result.data.sort((a, b) => collator.compare(a.name, b.name))

        result.data.forEach(
          locality =>
            locality.children &&
            locality.children.sort((a, b) => collator.compare(a.name, b.name))
        )

        setDistricts(result.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="districts-filter-wrapper">
      {loading ? (
        <Spinner className="centered-spinner" />
      ) : (
        districts.map(district => (
          <DistrictFilter
            key={district.id}
            district={district}
            selectedLocalities={selectedLocalities}
            setSelectedLocalities={setSelectedLocalities}
          />
        ))
      )}
    </div>
  )
}

LocalitiesFilters.propTypes = {
  city: PropTypes.object.isRequired,
  selectedLocalities: PropTypes.array.isRequired,
  setSelectedLocalities: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  city: state.locality.currentLocality.city
})

export default connect(mapStateToProps)(LocalitiesFilters)
