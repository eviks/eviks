import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import OSM, { ATTRIBUTION } from 'ol/source/OSM'
import { FullScreen, ScaleLine, defaults as DefaultControls } from 'ol/control'
import { fromEPSG4326 } from 'ol/proj/epsg3857'

export const initMap = (target, center, zoom) => {
  return new Map({
    target,
    layers: [
      new TileLayer({
        source: new OSM({
          url:
            'http://maps.gomap.az/info/xyz.do?lng=az&x={x}&y={y}&z={z}&f=jpg',
          attributions: [
            "(c) <a href='http://gomap.az/'>GoMap.Az</a>",
            ATTRIBUTION
          ]
        })
      })
    ],
    controls: DefaultControls().extend([new ScaleLine(), new FullScreen()]),
    view: new View({
      projection: 'EPSG:3857',
      center: fromEPSG4326(center),
      zoom
    })
  })
}
