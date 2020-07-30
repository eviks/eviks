import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import PropTypes from 'prop-types'

const SearchDivision = ({ onDivisionSelect, localities }) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    let results = []
    if (inputLength === 0) return results

    for (let index = 0; index < localities.length; index++) {
      if (results.length === 5) break
      const locality = localities[index]
      if (locality.name.toLowerCase().slice(0, inputLength) === inputValue) {
        results.push(locality)
      }
    }

    return results
  }

  const getSuggestionValue = suggestion => suggestion.name

  const renderSuggestion = suggestion => (
    <div className="search-division-item">{suggestion.name}</div>
  )

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const onSuggestionSelected = (event, { suggestion }) => {
    onDivisionSelect(suggestion)
  }

  const inputProps = {
    placeholder: 'Type something...',
    value,
    onChange
  }

  return (
    <div style={{ position: 'relative' }}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
    </div>
  )
}

SearchDivision.propTypes = {
  localities: PropTypes.array.isRequired,
  onDivisionSelect: PropTypes.func.isRequired
}

export default SearchDivision
