// Rahmen für die Karte 
let myMap = L.map("mapdiv");
//DOClink: 1.3.0.html#map-l-map
let markerGroup =L.featureGroup();
let myLayers= {
    osm: L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            subdomains : ["a", "b", "c"],
            //DOCLINK:http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>"
        //DOCLINK: http://leafletjs.com/reference-1.3.0.html#layer-attribution
        }
    ),
    // DOCLINK tileLayer: http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
        {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
    }
    ),
    bmapoverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
        }
    ),
    bmapgrau: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
        }
    ),
    bmaphidpi: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
        }
    ),
    bmaporthofoto30cm: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
        }
    )
};


// Layer zur Karte hinzufügen - zusammenbauen 
myMap.addLayer(myLayers.osm);

//DOCLINK: http://leafletjs.com/reference-1.3.0.html#map-addlayer

//DOKLINK: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
let myMapControl = L.control.layers ({
    
    "Openstreetmap" :myLayers.osm,
    "basemap.at Gundkarte":myLayers.geolandbasemap,
    "basemap.at grau":myLayers.bmapgrau,
    "basemap.at highdpi":myLayers.bmaphidpi,
    "basemap.at Orthofoto":myLayers.bmaporthofoto30cm,
    
},
{   "basemap.at Overlay":myLayers.bmapoverlay,
    "Marker": markerGroup,

},
{
    collapsed:false
});

//DOCLINK für collapse: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed

myMap.addControl (myMapControl);

//DOCLINK: http://leafletjs.com/reference-1.3.0.html#map-addcontrol


// Zentrum der Karte setzen 
myMap.setView([47.267,11.383],11)
//DOKLINK: http://leafletjs.com/reference-1.3.0.html#map-setview

// Doclink Scale: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale

L.control.scale({
        maxWidth: 200, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
        metric: true, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-metric
        imperial: false, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
        position: "bottomleft" //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-position
}).addTo(myMap);

myMap.addLayer(markerGroup);
const uni = [47.264, 11.385];
const usi = [47.257, 11.356];
const technik = [47.263, 11.343];
const igls = [47.232286, 11.408454];
const patscherkofel = [47.218472,11.466409];
const markerOptions = {
    titel: 'Universität Innsbruck',
    riseOnHover: true,
    draggable: true
};
L.marker(uni, markerOptions).addTo(markerGroup);
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technik, markerOptions).addTo(markerGroup);
L.marker (igls, markerOptions).addTo(markerGroup);
L.marker (patscherkofel, markerOptions).addTo(markerGroup).bindPopup("<p><h3>Patscherkofel</h3></p><img style='width:200px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/12-06-05-innsbruck-by-ralfr-014.jpg/1024px-12-06-05-innsbruck-by-ralfr-014.jpg' alt='Patscherkofel'/>");

// Übersichtlicher, wenn man eine neue Variable definiert und daran dann das Popup anbindet 
myMap.fitBounds(markerGroup.getBounds());

var latlngs= [
    [47.232286, 11.408454],
    [47.218472,11.466409]
];

var polyline = L.polyline (latlngs,
    {color: 'red'}).addTo(myMap);


let uniPolygon = L.polygon([uni,usi,technik]);
myMap.addLayer(uniPolygon);
 

//myMap.setView(uni,14);





