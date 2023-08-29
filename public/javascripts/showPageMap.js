const map = new ol.Map({
    target: 'map', // container ID
    view: new ol.View({
        center: ol.proj.fromLonLat(campground.geometry.coordinates), // starting position [lng, lat]
        zoom: 10 // starting zoom
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        })
    ]
});

const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(campground.geometry.coordinates))
});

const popupContent = document.createElement('div');
popupContent.innerHTML = `<h3>${campground.title}</h3><p>${campground.location}</p>`;

const popup = new ol.Overlay({
    element: popupContent,
    offset: [0, -25],
    positioning: 'bottom-center'
});

map.addOverlay(popup);
marker.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png' // Use your marker icon URL
    })
}));

marker.on('click', () => {
    popup.setPosition(marker.getGeometry().getCoordinates());
});

const vectorSource = new ol.source.Vector({
    features: [marker]
});

const vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

map.addLayer(vectorLayer);
