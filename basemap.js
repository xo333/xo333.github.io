// Rahmen für die Karte 
let myMap = L.map("mapdiv");
let myLayers= {
    osm: L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ),
    geolandbasemap: L.tileLayer(
        "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmapoverlay: L.tileLayer (
        "https://maps.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmapgrau: L.tileLayer (
        "https://maps.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmaphidpi: L.tileLayer (
        "https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jepg"
    ),
    bmaporthofoto30cm: L.tileLayer (
        "https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jepg"
    )
};


// Layer zur Karte hinzufügen - zusammenbauen 
myMap.addLayer(myLayers.osm);
// Zentrum der Karte setzen 
myMap.setView([47.267,11.383],11)