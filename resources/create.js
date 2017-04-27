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

var names = new ol.layer.Vector({
    source: namesSource,
    style: function(feature) {
      var text = feature.get('woonplaats');
      return [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(255, 255, 255, 1)',
        width: 0.3
      }),
      text: new ol.style.Text({
        fill: new ol.style.Fill({
          color: 'rgba(50, 50, 50, 1)'
        }),
        text: text,
        textAlign:"center",
        font: '10px sans-serif'
      })
    })];
    }
});

var background = new ol.layer.Tile({
source: new ol.source.Stamen({
      layer: 'toner-background'
    })
});

var namesS = new ol.layer.Tile({
source: new ol.source.Stamen({
      layer: 'toner-labels'
    })
});


var filter = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'resources/countries.geojson'
    }),
    style: function(feature, resolution) {
     var name = feature.get('NAME');
     if (name !== "Netherlands")
      return [new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 0, 0.1)',
      })
    })];
    }
});

var view = new ol.View({
    center: ol.proj.transform([5.4228987, 52.201538], 'EPSG:4326','EPSG:900913'), 
    projection: 'EPSG:900913',
    zoom: 9.8
});

var map = new ol.Map({
  layers: [ background, namesS, filter],
  target: document.getElementById('map'),
  view: view
});