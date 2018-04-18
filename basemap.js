// 
let myMap = L.map("mapdiv");
// Hintergrund aus dem Internet geladen 
let myLayer = L.tileLayer ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

// alles zusammenhängen 
myMap.addLayer(myLayer);
// Koordinaten in eckigen Klammern
myMap.setView([47.267,11.383],11)