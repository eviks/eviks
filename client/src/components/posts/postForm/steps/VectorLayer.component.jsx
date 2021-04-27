import { useEffect } from 'react'
import {
  getAddressByCoords,
  updatePostFormAttributes,
} from '../../../../actions/post'
import { Vector as VectorLayer } from 'ol/layer'
import { connect } from 'react-redux'
import { fromEPSG4326, toEPSG4326 } from 'ol/proj/epsg3857'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import useIsMount from '../../../../services/hooks/useIsMount'
import PropTypes from 'prop-types'
import markerStyle from '../../../layout/mapAssets/markerStyle'

const source = new VectorSource({
  features: undefined,
})

const layer = new VectorLayer({ source })

const VectorLayerComponent = ({
  map,
  postForm: { location },
  getAddressByCoords,
  updatePostFormAttributes,
}) => {
  useEffect(() => {
    if (location[0] === 0 || location[1] === 0) {
      source.clear()
    } else {
      const featureToAdd = new Feature({
        geometry: new Point(fromEPSG4326(location)),
      })
      featureToAdd.setStyle(markerStyle)

      source.clear()
      source.addFeatures([featureToAdd])
    }
  }, [location])

  const onMapClick = (event) => {
    getAddressByCoords(toEPSG4326(event.coordinate))
  }

  const onMapMove = () => {
    const centerPosition = map.getView().targetCenter_
    updatePostFormAttributes({ searchArea: toEPSG4326(centerPosition) })
  }

  const isMounted = useIsMount()
  if (isMounted) {
    map.on('singleclick', (event) => onMapClick(event))
    map.on('moveend', () => onMapMove())
    map.addLayer(layer)
  }

  return null
}

VectorLayerComponent.propTypes = {
  map: PropTypes.object.isRequired,
  postForm: PropTypes.object.isRequired,
  getAddressByCoords: PropTypes.func.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  postForm: state.post.postForm,
})

export default connect(mapStateToProps, {
  getAddressByCoords,
  updatePostFormAttributes,
})(VectorLayerComponent)
