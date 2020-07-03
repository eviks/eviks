import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import marker from '../../../utils/icons/marker.svg'

export default new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: marker,
    scale: 0.3
  })
})
