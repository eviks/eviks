import { Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromEPSG4326 } from 'ol/proj/epsg3857'
import PropTypes from 'prop-types'
import markerStyle from '../../../layout/mapAssets/markerStyle'

const source = new VectorSource({
  features: undefined
})

const layer = new VectorLayer({ source })

const VectorLayerComponent = ({ map, location }) => {
  map.addLayer(layer)

  const featureToAdd = new Feature({
    geometry: new Point(fromEPSG4326(location))
  })
  featureToAdd.setStyle(markerStyle)

  source.clear()
  source.addFeatures([featureToAdd])

  return null
}

VectorLayerComponent.propTypes = {
  map: PropTypes.object.isRequired,
  location: PropTypes.array.isRequired
}

export default VectorLayerComponent
