import { useEffect } from 'react'
import { Vector as VectorLayer } from 'ol/layer'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
import { toEPSG4326, fromEPSG4326 } from 'ol/proj/epsg3857'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import marker from '../../../../utils/icons/marker.svg'
import useIsMount from '../../../../utils/hooks/useIsMount'
import PropTypes from 'prop-types'

const markerStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: marker,
    scale: 0.3
  })
})

const source = new VectorSource({
  features: undefined
})

const layer = new VectorLayer({ source })

const VectorLayerComponent = ({
  map,
  postForm: { location },
  updatePostFormAttributes
}) => {
  useEffect(() => {
    if (location.lat === 0 || location.lng === 0) {
      source.clear()
    } else {
      const featureToAdd = new Feature({
        geometry: new Point(fromEPSG4326([location.lng, location.lat]))
      })
      featureToAdd.setStyle(markerStyle)

      source.clear()
      source.addFeatures([featureToAdd])
    }
  }, [location])

  const onMapClick = event => {
    const coords = event.coordinate
    const formattedCoords = toEPSG4326(coords)

    console.log({ lat: formattedCoords[1], lng: formattedCoords[0] })

    updatePostFormAttributes({
      location: { lat: formattedCoords[1], lng: formattedCoords[0] }
    })

    map.getView().animate({
      center: coords,
      zoom: 18,
      duration: 1000
    })
  }

  const isMounted = useIsMount()
  if (isMounted) {
    map.on('singleclick', onMapClick)
    map.addLayer(layer)
  }

  return null
}

VectorLayerComponent.propTypes = {
  map: PropTypes.object.isRequired,
  postForm: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm
})

export default connect(mapStateToProps, { updatePostFormAttributes })(
  VectorLayerComponent
)
