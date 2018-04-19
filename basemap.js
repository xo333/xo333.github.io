// Rahmen für die Karte 
let myMap = L.map("mapdiv");
let myLayers= {
    osm: L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ),
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

let myMapControl = L.control.layers ({
    "Openstreetmap" :myLayers.osm,
    "basemap.at Gundkarte":myLayers.geolandbasemap,
    
    "basemap.at grau":myLayers.bmapgrau,
    "basemap.at highdpi":myLayers.bmaphidpi,
    "basemap.at Orthofoto":myLayers.bmaporthofoto30cm,
    
},
{   "basemap.at Overlay":myLayers.bmapoverlay,

});

myMap.addControl (myMapControl);


// Zentrum der Karte setzen 
myMap.setView([47.267,11.383],11)

// Doclink Scale: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
// Link: Optionen: http://leafletjs.com/reference-1.3.0.html#control-scale-position
let myScaleControl =  L.control.scale({
    options:{
        maxWidth: 200,
        metric: true,
        imperial: false,
        position: "bottomleft"
    }
}).addTo(myMap);



// imperial wird trotzdem angezeigt.. bekomme es auch mit true und false nicht raus. 


