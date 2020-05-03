import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { useTranslation } from 'react-i18next'

import './placeInput.style.scss'

const LocationSearchInput = ({
  options: { name, value, searchOptions },
  onChange
}) => {
  const [t] = useTranslation()

  const onSelect = async address => {
    try {
      const results = await geocodeByAddress(address)
      const latLng = await getLatLng(results[0])
      const { formatted_address, address_components } = results[0]
      console.log(results[0])
      const city = address_components[address_components.length - 2].long_name
      const district = address_components[1].long_name
      onChange(city, district, formatted_address, latLng.lat, latLng.lng)
    } catch (error) {
      console.error('Error', error)
    }
  }

  return (
    <PlacesAutocomplete
      value={value}
      searchOptions={searchOptions}
      onChange={e => onChange(null, null, e, null, null)}
      onSelect={e => onSelect(e)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ position: 'relative' }}>
          <input
            {...getInputProps({
              placeholder: t('form.googleAutoComplitePlaceholder'),
              className: 'location-search-input field'
            })}
          />
          <div
            className="autocomplete-dropdown-container"
            style={{ display: suggestions.length ? 'block' : 'none' }}
          >
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item'

              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default LocationSearchInput
