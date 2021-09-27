// https://geodata.nationaalgeoregister.nl/bag/wfs?request=GetCapabilities
var namesSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function(extent) {
      return 'https://geodata.nationaalgeoregister.nl/bag/wfs?service=WFS&' +
          'version=2.0.0&request=GetFeature&typename=woonplaats&' +
          'outputformat=json&srsname=EPSG:900913&' +
          'bbox=' + extent.join(',') + ',EPSG:900913';
    },
    strategy: ol.loadingstrategy.bbox
});


var background = new ol.layer.Tile({
source: new ol.source.Stamen({
      layer: 'toner-background'
    })
});

var lines = new ol.layer.Tile({
source: new ol.source.Stamen({
      layer: 'toner-lines'
    })
});


var view = new ol.View({
    center: ol.proj.transform([5.38721, 52.15517], 'EPSG:4326','EPSG:900913'), 
    projection: 'EPSG:900913',
    zoom: 14,
    tilePixelRatio: 2
});




var map = new ol.Map({
  layers: [ background,lines],
  target: document.getElementById('map'),
  view: view
});
