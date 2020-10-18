import React from 'react'
import Checkbox from '../../../../../layout/form/checkbox/checkbox.component'
import PropTypes from 'prop-types'

const DistrictFilter = ({
  district,
  selectedLocalities,
  setSelectedLocalities
}) => {
  const children = district.children
  const districtHasChildren = children && children.length > 0
  const childrenIds = districtHasChildren ? children.map(child => child.id) : []

  const inspectChildren = () => {
    if (!districtHasChildren) return selectedLocalities.includes(district.id)

    for (let index = 0; index < childrenIds.length; index++) {
      if (!selectedLocalities.includes(childrenIds[index])) {
        return false
      }
    }

    return true
  }

  const districtIsSelected = inspectChildren()

  const districtOnChange = () => {
    if (!districtHasChildren) {
      toggleLocality(district.id)
      return
    }

    if (districtIsSelected) {
      setSelectedLocalities(
        selectedLocalities.filter(id => !childrenIds.includes(id))
      )
    } else {
      setSelectedLocalities([...selectedLocalities, ...childrenIds])
    }
  }

  const toggleLocality = id => {
    if (selectedLocalities.includes(id)) {
      setSelectedLocalities(
        selectedLocalities.filter(locality => locality !== id)
      )
    } else {
      setSelectedLocalities([...selectedLocalities, id])
    }
  }

  return (
    <div className="distric-filter-block">
      <div className="distric-filter text-bold">
        <Checkbox
          label={district.name}
          options={{
            name: district.id,
            id: district.id,
            checked: districtIsSelected
          }}
          onChange={() => districtOnChange()}
        />
      </div>
      {districtHasChildren && (
        <div className="subdistricts-filter-wrapper">
          {children.map(subdistrict => (
            <div key={subdistrict.id}>
              <Checkbox
                label={subdistrict.name}
                options={{
                  name: subdistrict.id,
                  id: subdistrict.id,
                  checked: selectedLocalities.includes(subdistrict.id)
                }}
                onChange={() => toggleLocality(subdistrict.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

DistrictFilter.propTypes = {
  district: PropTypes.object.isRequired,
  selectedLocalities: PropTypes.array.isRequired,
  setSelectedLocalities: PropTypes.func.isRequired
}

export default DistrictFilter
