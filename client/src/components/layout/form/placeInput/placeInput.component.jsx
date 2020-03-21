import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

import './placeInput.style.scss'

const LocationSearchInput = ({
  options: { name, value, searchOptions },
  onChange
}) => {
  const onSelect = async address => {
    try {
      const results = await geocodeByAddress(address)
      const latLng = await getLatLng(results[0])
      onChange(results[0].formatted_address, latLng.lat, latLng.lng)
    } catch (error) {
      console.error('Error', error)
    }
  }

  return (
    <PlacesAutocomplete
      value={value}
      searchOptions={searchOptions}
      onChange={e => onChange(e, null, null)}
      onSelect={e => onSelect(e)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ position: 'relative' }}>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
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
