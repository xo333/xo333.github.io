/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren (gemacht)
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern (gemacht)
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern 

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// Rahmen für die Karte 
let myMap = L.map("map");
//DOClink: 1.3.0.html#map-l-map


let markerGroup = L.featureGroup();
let coordGroup = L.featureGroup();
let overlayElevation = L.featureGroup().addTo(myMap);

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
    gdi_base_summer: L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",
        {
            attribution: "Datenquelle: <a href='http://kartetirol.at/#10/47.1897/11.5700'> kartetirol.at </a>"
        }
    ),
    gdi_base_winter: L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",
        {
            //subdomains : [],
            attribution: "Datenquelle: <a href='http://kartetirol.at/#10/47.1897/11.5700'> kartetirol.at </a>"
        }
    ),
    gdi_base_ortho: L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.png8",
        {
            //subdomains : [],
            attribution: "Datenquelle: <a href='http://kartetirol.at/#10/47.1897/11.5700'> kartetirol.at </a>"
        }
    ),
    gdi_base_nomenklatur: L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8",
        {
            //subdomains : [],
            attribution: "Datenquelle: <a href='http://kartetirol.at/#10/47.1897/11.5700'> kartetirol.at </a>"
        }
    ),
    bmapoverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
        }
    ),

    /* bmapgrau: L.tileLayer (
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
    )*/
};

const tiris_Sommer = L.layerGroup([
    myLayers.gdi_base_summer, 
    myLayers.gdi_base_nomenklatur,
]);
const tiris_Winter = L.layerGroup([
    myLayers.gdi_base_winter, 
    myLayers.gdi_base_nomenklatur,
]);
const tiris_Ortho = L.layerGroup([
    myLayers.gdi_base_ortho, 
    myLayers.gdi_base_nomenklatur,
]);

// Layer zur Karte hinzufügen - zusammenbauen 
myMap.addLayer(myLayers.osm);

//DOCLINK: http://leafletjs.com/reference-1.3.0.html#map-addlayer

//DOKLINK: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
let myMapControl = L.control.layers ({
    //<Object> baselayers?
    "Openstreetmap" :myLayers.osm,
    "basemap.at Gundkarte":myLayers.geolandbasemap,
    //"basemap.at grau":myLayers.bmapgrau,
    //"basemap.at highdpi":myLayers.bmaphidpi,
    //"basemap.at Orthofoto":myLayers.bmaporthofoto30cm,

    "Karte Tirol Sommer": tiris_Sommer,
    "Karte Tirol Winter": tiris_Winter,
    "Karte Tirol Orthofoto": tiris_Ortho,
    
},
{   //"basemap.at Overlay":myLayers.bmapoverlay,
    "Start/Ziel":markerGroup,
   // "GPX-Track":coordGroup,
    "Steigungslinie": overlayElevation
// <Object> overlays=
},
{
    collapsed: false
// <Control.Layers options> options? 
});

//DOCLINK für collapse: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed

myMap.addControl (myMapControl);

//DOCLINK: http://leafletjs.com/reference-1.3.0.html#map-addcontrol


// Zentrum der Karte setzen 
// myMap.setView([47.267,11.383],11)
//DOKLINK: http://leafletjs.com/reference-1.3.0.html#map-setview

// Doclink Scale: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale

L.control.scale({
        maxWidth: 200, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
        metric: true, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-metric
        imperial: false, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
        position: "bottomleft" //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-position
}).addTo(myMap);

myMap.addLayer(markerGroup);
const start = [47.499494, 10.516238];
const finish = [47.457306, 10.719708];

/* var startIcon = L.icon ({
    iconUrl:'images/start.png',
    iconAnchor: [16,37]
});*/


let startMarker = L.marker (start,
{
    icon: L.icon ({
        iconUrl:'images/start.png',
        iconAnchor: [16,37],
        popupAnchor: [0, -37]
    })}).addTo(markerGroup);
    startMarker.bindPopup("<h3>Tannheim</h3> Zum Wikipediaeintrag: <a href='https://de.wikipedia.org/wiki/Tannheim_(Tirol)'> Tannheim </a>").openPopup;

let finishMarker = L.marker (finish,
{
    icon: L.icon ({
        iconUrl:'images/finish.png',
        iconAnchor:[16,37],
        popupAnchor:[0,-37],
    })}).addTo(markerGroup);
    finishMarker.bindPopup("<h3> Reutte </h3> Zum Wikipediaeintrag <a href='https://de.wikipedia.org/wiki/Reutte'> Reutte </a>").openPopup;


myMap.addLayer(coordGroup);

/* let geojson = L.geoJSON(etappe03).addTo(coordGroup);
geojson.bindPopup(function(layer) {
    const props = layer.feature.properties;
    const popupText = `${props.name}`;
    return popupText;
}); 

myMap.fitBounds(coordGroup.getBounds()); */



let gpxTrack = new L.GPX("data/etappe03.gpx", {
    async: true, 
});//.addTo(coordGroup);
gpxTrack.on("loaded", function (evt){
    let track = evt.target;
    console.log("get_distance", track.get_distance().toFixed(0))
    console.log("get_elevation_min", track.get_elevation_min())
    console.log("get_elevation_max", track.get_elevation_max())
    console.log("get_elevation_gain", track.get_elevation_gain())
    console.log("get_elevation_loss", track.get_elevation_loss())
    myMap.fitBounds(track.getBounds());

    //let laenge = evt.target.get_distance().toFixed(0);
    //document.getElementById("laenge").innerHTML = laenge;
    document.getElementById("get_distance").innerHTML = track.get_distance().toFixed(0);
    document.getElementById("get_elevation_min").innerHTML = track.get_elevation_min().toFixed(0);
    document.getElementById("get_elevation_max").innerHTML = track.get_elevation_max().toFixed(0);
    document.getElementById("get_elevation_gain").innerHTML = track.get_elevation_gain().toFixed(0);
    document.getElementById("get_elevation_loss").innerHTML = track.get_elevation_loss().toFixed(0);
    
});

//Fullscreen
myMap.addControl(new L.Control.Fullscreen(map));

let elevationProfil = L.control.elevation ({
    position: "bottomleft",
    theme: "lime-theme",
    width: 600,
	height: 125,
	margins: {
		top: 10,
		right: 20,
		bottom: 30,
		left: 50
	},
    useHeightIndicator: true,
    interpolation: "linear",
    hoverNumber: {
		decimalsX: 3, //decimals on distance (always in km)
		decimalsY: 0, //deciamls on hehttps://www.npmjs.com/package/leaflet.coordinatesight (always in m)
		formatter: undefined //custom formatter function may be injected
    },
    xTicks: undefined, //number of ticks in x axis, calculated by default according to width
	yTicks: undefined, //number of ticks on y axis, calculated by default according to height
	collapsed: true,  //collapsed mode, show chart on click or mouseover
	imperial: false    //display imperial units instead of metric
});

elevationProfil.addTo (myMap);

gpxTrack.on("addline",function(evt){
elevationProfil.addData(evt.line);
console.log (evt.line);
console.log (evt.line.getLatLngs());
console.log (evt.line.getLatLngs()[0]);
console.log (evt.line.getLatLngs()[0].lat);
console.log (evt.line.getLatLngs()[0].lng);
console.log (evt.line.getLatLngs()[0].meta);
console.log (evt.line.getLatLngs()[0].meta.ele);

// alle Segmente der Steigungslinie hinzufügen
 let gpxLinie = evt.line.getLatLngs ();
 for (let i = 1; i < gpxLinie.length; i ++) {
     let p1 = gpxLinie [i-1];
     let p2 =gpxLinie[i];
     
    //DOCS: https://leafletjs.com/reference-1.3.0.html#map-distance
    //Entfernung zwischen den Punkten berechnen
    let dist = myMap.distance (
        [p1.lat, p1.lng],
        [p2.lat, p2.lng]
    );
    // Höhenunterschied berechnen 
    let delta = p2.meta.ele - p1.meta.ele;
    // Steigung in Prozent berechenen mit einer Nachkommastelle (toFixed)
   
    /* let proz = 0; 
    if (dist > 0) {
        proz = (delta/dist * 100.0).toFixed(1);
    } */

    let proz = (dist > 0) ? (delta / dist * 100.00).toFixed(1) : 0;
    //Bedingung ? Ausdruck 1 : Ausdruck 2 

    console.log(p1.lat,p1.lng,p2.lat,p2.lng, dist, delta, proz); 

     // DOCS: https://leafletjs.com/reference-1.3.0.html#polyline
    // Farben: http://colorbrewer2.org/#type=sequential&scheme=Reds&n=7

     let farbe = 
        proz > 10  ? "#fc9272": 
        proz > 6   ? "#fcbba1":
        proz > 2   ? "#fee5d9":
        proz > 0   ? "#edf8e9":
        proz > -2  ? "#c7e9c0":
        proz > -6  ? "#a1d99b":
        proz > -10 ? "#74c476":
                     "#41ab5d";

     let segment = L.polyline([
         [p1.lat, p1.lng],
         [p2.lat, p2.lng],
      ], {
         color: farbe,
         weight: 5
        }
    ).addTo(overlayElevation);
 }
});








// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol


// Maßstab metrisch ohne inch (check)

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/ (check)

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel) (check)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen
