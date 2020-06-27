import { ADD_POST, POST_ERROR } from '../actions/types'
import { asyncActionError } from '../actions/async'
import { yandexAPIKey } from '../config'
import axios from 'axios'

const addPostMiddleware = ({ dispatch, getState }) => next => async action => {
  if (action.type !== 'ADD_POST_API') {
    return next(action)
  }

  try {
    // Get district
    if ((action.payload.city = 'Baku')) {
      const { lat, lng } = action.payload.location
      const searchParams = {
        apikey: yandexAPIKey,
        geocode: `${lat},${lng}`,
        lang: 'az_AZ',
        kind: 'district',
        results: 1,
        sco: 'latlong',
        format: 'json',
        bbox: '44.46,38.24~50.33,41.54'
      }
      const searchParamsString = new URLSearchParams(searchParams).toString()
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?${searchParamsString}`
      )
      const featureMember = res.data.response.GeoObjectCollection.featureMember
      if (featureMember.length > 0) {
        const GeocoderMetaData =
          featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData

        GeocoderMetaData.Address.Components.forEach(component => {
          if (component.kind === 'district')
            action.payload.district = component.name
        })
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/posts', action.payload, config)
    action.result = true
    dispatch({ type: ADD_POST, payload: res.data })
    next(action)
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response
      }
    })
  }
}

export default addPostMiddleware
